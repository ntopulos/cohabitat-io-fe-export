import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerRevisionsMeta } from '../models/partner/partner-revisions-meta.model';
import { PartnerRevisionService } from '../services/partner-revision.service';

@Injectable({
  providedIn: 'root'
})

export class PartnerRevisionsResolverService implements Resolve<PartnerRevisionsMeta[]> {

  constructor(
    private projectRevisionService: PartnerRevisionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<PartnerRevisionsMeta[]> {
    return this.projectRevisionService.getRevisions(route.paramMap.get('id'));
  }
}
