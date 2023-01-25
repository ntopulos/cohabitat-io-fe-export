import { FiletypesMeta } from '../models/filetypes-meta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiletypeService {

  constructor(private http: HttpClient) { }

  /** GET project's comment */
  getFiletypes(): Observable<FiletypesMeta> {
    return this.http.get<FiletypesMeta>(`${environment.apiUrl}/filetypes`)
      .pipe(map(r => new FiletypesMeta(r)));
  }
}
