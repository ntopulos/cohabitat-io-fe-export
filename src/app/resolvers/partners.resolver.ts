import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerService } from '../services/partner.service';
import { PartnersMeta } from '../models/partner/partners-meta.model';

@Injectable({
  providedIn: 'root'
})

export class PartnersResolverService implements Resolve<PartnersMeta> {

  constructor(
    private partnerService: PartnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<PartnersMeta> {
    return this.partnerService.getPartners();
  }
}
