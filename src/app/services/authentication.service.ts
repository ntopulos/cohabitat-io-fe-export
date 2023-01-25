import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AuthToken } from '../models/auth-token.model';

import { UserSelf } from '../models/user-self.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentAuthTokenSubject: BehaviorSubject<AuthToken>;
  public currentAuthToken: Observable<AuthToken>;

  constructor(private http: HttpClient) {
    this.currentAuthTokenSubject = new BehaviorSubject<AuthToken>(
      JSON.parse(localStorage.getItem('currentAuthToken')));
    this.currentAuthToken = this.currentAuthTokenSubject.asObservable();
  }

  public get currentAuthTokenValue(): AuthToken {
      return this.currentAuthTokenSubject.value;
  }

  public get currentUser(): UserSelf {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/token`, {email, password})
    .pipe(mergeMap(result => {
      // store user details and jwt token in local storage to keep result logged in between page refreshes
      var currentAuthToken = new AuthToken(result);
      localStorage.setItem('currentAuthToken', JSON.stringify(currentAuthToken));
      this.currentAuthTokenSubject.next(result);

      return this.http.get(`${environment.apiUrl}/auth/user`)
      .pipe(map(result => {
        let user = new UserSelf();
        user.initializeFromRequest(result);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }));
    }));
  }

  public logout() {
    this.http.delete<any>(`${environment.apiUrl}/auth/token`)
    .pipe(map(result => {
      this.currentAuthTokenSubject.next(null);
      return result;
    }))
    .subscribe()
    .add(() => {
      // remove user from local storage to log user out
      localStorage.removeItem('currentAuthToken');
      localStorage.removeItem('currentUser');
    });
  }

  public register(name: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/user`, {name, email, password})
    .pipe(map(result => {
      return result;
    }));
  }

  public activate(activation_token: string) {
    return this.http.patch<any>(`${environment.apiUrl}/auth/user`, {activation_token})
    .pipe(map(result => {
      return result;
    }));
  }

  public resetPasswordToken(email: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/password`, {email})
    .pipe(map(result => {
      return result;
    }));
  }

  public resetPassword(reset_token: string, password: string) {
    var _method = 'PUT';
    return this.http.post<any>(`${environment.apiUrl}/auth/password`, {reset_token, password, _method})
    .pipe(map(result => {
      return result;
    }));
  }

}
