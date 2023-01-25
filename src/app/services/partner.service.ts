import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectFilesMeta } from '../models/objet-files-meta.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PartnersMeta } from '../models/partner/partners-meta.model';
import { PartnerMeta } from '../models/partner/partner-meta.model';

@Injectable({
  providedIn: 'root'
})

export class PartnerService {

  constructor(private http: HttpClient) { }

  /** GET partners */
  getPartners(): Observable<PartnersMeta> {
    return this.http.get<PartnersMeta>(`${environment.apiUrl}/partners`);
  }

  /** GET partner */
  getPartner(id: string): Observable<PartnerMeta> {
    const url = `${environment.apiUrl}/partners/${id}`;
    return this.http.get<PartnerMeta>(url)
    .pipe(map(result => new PartnerMeta(result)));
  }

  /** GET partner files/images */
  getFiles(id: string): Observable<ObjectFilesMeta> {
    const url = `${environment.apiUrl}/partners/${id}/files`;
    return this.http.get<ObjectFilesMeta[]>(url)
    .pipe(map(result => new ObjectFilesMeta(result)));
  }

  /** POST partner */
  createPartner(partner): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/partners`, partner)
    .pipe(map(result => new PartnerMeta(result)));
  }

  /** PATCH partner */
  updatePartner(id: string, partner): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/partners/${id}`, partner)
    .pipe(map(result => new PartnerMeta(result)));
  }
}
