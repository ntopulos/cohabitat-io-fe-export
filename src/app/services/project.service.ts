import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectsMeta } from '../models/project/projects-meta.model';
import { ProjectMeta } from '../models/project/project-meta.model';
import { ObjectFilesMeta } from '../models/objet-files-meta.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  /** GET projects */
  getProjects(): Observable<ProjectsMeta> {
    return this.http.get<ProjectsMeta>(`${environment.apiUrl}/projects`);
  }

  /** GET projects */
  getProjectsFilterByTags(query: string): Observable<ProjectsMeta> {
    return this.http.get<ProjectsMeta>(`${environment.apiUrl}/projects?tags=${query}`);
  }

  /** GET projects?search= */
  searchProjects(query: string): Observable<ProjectsMeta> {
    return this.http.get<ProjectsMeta>(`${environment.apiUrl}/projects?search=${query}`);
  }

  /** GET project */
  getProject(id: string): Observable<ProjectMeta> {
    const url = `${environment.apiUrl}/projects/${id}`;
    return this.http.get<ProjectMeta>(url)
    .pipe(map(result => new ProjectMeta(result)));
  }

  /** GET project files/images */
  getFiles(id: string): Observable<ObjectFilesMeta> {
    const url = `${environment.apiUrl}/projects/${id}/files`;
    return this.http.get<ObjectFilesMeta[]>(url)
    .pipe(map(result => new ObjectFilesMeta(result)));
  }

  /** POST project */
  createProject(project): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/projects`, project)
    .pipe(map(result => new ProjectMeta(result)));
  }

  /** PATCH project */
  updateProject(id: string, project): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/projects/${id}`, project)
    .pipe(map(result => new ProjectMeta(result)));
  }

  /** POST project image */
  createProjectImage(project_id, input): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/projects/${project_id}/files`,
      input
    );
  }

  /** PATCH project images order */
  updateProjectImagesOrder(id: string, order): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/projects/${id}/files`, order);
  }


  /** PATCH project */
  updateProjectMainImage(project_id: string, file_id: string): Observable<any> {
    return this.http.patch<any>(
      `${environment.apiUrl}/projects/${project_id}/files/${file_id}`,
      {}
    );
  }

  /** DELETE project file */
  deleteProjectFile(project_id: string, file_id: string, description: string): Observable<any> {
    return this.http.request<any>(
      'delete',
      `${environment.apiUrl}/projects/${project_id}/files/${file_id}`,
      {
        body: {
          description: description
        }
      }
    );
  }

}
