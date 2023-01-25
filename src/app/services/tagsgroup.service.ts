import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagsgroupMeta } from '../models/tagsgroup-meta.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TagsgroupService {

  constructor(private http: HttpClient) { }

  /** GET project-tags */
  getTags(): Observable<TagsgroupMeta> {
    return this.http.get<TagsgroupMeta>(`${environment.apiUrl}/tagsgroups`)
    .pipe(map(result => new TagsgroupMeta(result)));
  }

}
