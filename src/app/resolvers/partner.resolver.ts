import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerService } from '../services/partner.service';
import { PartnerMeta } from '../models/partner/partner-meta.model';

@Injectable({
  providedIn: 'root'
})

export class PartnerResolverService implements Resolve<PartnerMeta> {

  constructor(
    private partnerService: PartnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<PartnerMeta> {
    return this.partnerService.getPartner(route.paramMap.get('id'));
  }
}
