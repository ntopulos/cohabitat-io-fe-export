import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { TagsgroupService } from '../services/tagsgroup.service';
import { TagsgroupMeta } from '../models/tagsgroup-meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TagsgroupsResolverService implements Resolve<TagsgroupMeta> {

  constructor(
    private TagsgroupService: TagsgroupService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<TagsgroupMeta> {
    return this.TagsgroupService.getTags();
  }
}
