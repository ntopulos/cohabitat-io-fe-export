import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartnerRevisionsMeta } from '../models/partner/partner-revisions-meta.model';
import { PartnerRevisionMeta } from '../models/partner/partner-revision-meta.model';

@Injectable({
  providedIn: 'root'
})

export class PartnerRevisionService {

  constructor(private http: HttpClient) { }

  /** GET partner-revisions */
  getRevisions(partner_uuid: string): Observable<PartnerRevisionsMeta[]> {
    const url = `${environment.apiUrl}/partners/${partner_uuid}/revisions`;
    return this.http.get<PartnerRevisionsMeta[]>(url);
  }

  /** GET partner-revision */
  getRevision(partner_uuid: string, revision_id: number): Observable<PartnerRevisionMeta[]> {
    const url = `${environment.apiUrl}/partners/${partner_uuid}/revisions/${revision_id}`;
    return this.http.get<PartnerRevisionMeta[]>(url);
  }

}
