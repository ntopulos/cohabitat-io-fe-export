import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentsMeta } from '../models/comments-meta.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http: HttpClient) { }

  /** GET project's comment */
  getProjectComments(project_id, page): Observable<CommentsMeta> {
    return this.http.get<CommentsMeta>(
      `${environment.apiUrl}/projects/${project_id}/comments?page=${page}`
    ).pipe(map(r => new CommentsMeta(r)));
  }

  /** POST project's comment */
  createProjectComment(project_id, comment): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/projects/${project_id}/comments`,
      comment
    );
  }

  /** GET partner's comment */
  getPartnerComments(partner_id, page): Observable<CommentsMeta> {
    return this.http.get<CommentsMeta>(
      `${environment.apiUrl}/partners/${partner_id}/comments?page=${page}`
    ).pipe(map(r => new CommentsMeta(r)));
  }

  /** POST partner's comment */
  createPartnerComment(partner_id, comment): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/partners/${partner_id}/comments`,
      comment
    );
  }
}
