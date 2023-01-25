import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectPropertiesMeta } from '../models/project/projectproperties-meta.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectPropertyService {

  constructor(private http: HttpClient) { }

  /** GET project-properties */
  getProperties(): Observable<ProjectPropertiesMeta> {
    return this.http.get<ProjectPropertiesMeta>(`${environment.apiUrl}/project-properties`)
    .pipe(map(result => new ProjectPropertiesMeta(result)));
  }

}
