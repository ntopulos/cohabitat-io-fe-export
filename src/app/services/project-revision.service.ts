import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectRevisionsMeta } from '../models/project/project-revisions-meta.model';
import { ProjectRevisionMeta } from '../models/project/project-revision-meta.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectRevisionService {

  constructor(private http: HttpClient) { }

  /** GET project-revisions */
  getRevisions(project_uuid: string): Observable<ProjectRevisionsMeta[]> {
    const url = `${environment.apiUrl}/projects/${project_uuid}/revisions`;
    return this.http.get<ProjectRevisionsMeta[]>(url);
  }

  /** GET project-revision */
  getRevision(project_uuid: string, revision_id: number): Observable<ProjectRevisionMeta[]> {
    const url = `${environment.apiUrl}/projects/${project_uuid}/revisions/${revision_id}`;
    return this.http.get<ProjectRevisionMeta[]>(url);
  }

}
