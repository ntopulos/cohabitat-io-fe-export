import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerRevisionMeta } from '../models/partner/partner-revision-meta.model';
import { PartnerRevisionService } from '../services/partner-revision.service';

@Injectable({
  providedIn: 'root'
})

export class PartnerRevisionResolverService implements Resolve<PartnerRevisionMeta[]> {

  constructor(
    private partnerRevisionService: PartnerRevisionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<PartnerRevisionMeta[]> {
    return this.partnerRevisionService.getRevision(
      route.paramMap.get('id'),
      Number(route.paramMap.get('revision_id'))
    );
  }
}
