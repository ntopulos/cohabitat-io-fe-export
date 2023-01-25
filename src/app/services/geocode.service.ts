import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Geocode } from '../models/geocode.model';

@Injectable({
  providedIn: 'root'
})

export class GeocodeService {

  constructor(private http: HttpClient) { }

  /** GET projects?search= */
  geocodeAddress(query: string): Observable<Geocode> {
    return this.http.get<Geocode>(`${environment.apiUrl}/tools/geocode?address=${query}`);
  }

}
