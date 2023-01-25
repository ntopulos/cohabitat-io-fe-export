import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ObjectFilesMeta } from '../models/objet-files-meta.model';
import { Observable } from 'rxjs';
import { PartnerService } from '../services/partner.service';

@Injectable({
  providedIn: 'root'
})

export class PartnerFilesResolverService implements Resolve<ObjectFilesMeta> {

  constructor(
    private partnerService: PartnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ObjectFilesMeta> {
    return this.partnerService.getFiles(route.paramMap.get('id'));
  }
}
