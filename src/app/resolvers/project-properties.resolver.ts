import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ProjectPropertyService } from '../services/project-property.service';
import { ProjectPropertiesMeta } from '../models/project/projectproperties-meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectPropertiesResolverService implements Resolve<ProjectPropertiesMeta> {

  constructor(
    private projectPropertyService: ProjectPropertyService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ProjectPropertiesMeta> {
    return this.projectPropertyService.getProperties();
  }
}
