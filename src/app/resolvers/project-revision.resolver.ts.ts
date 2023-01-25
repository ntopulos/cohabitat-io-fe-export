import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectRevisionMeta } from '../models/project/project-revision-meta.model';
import { ProjectRevisionService } from '../services/project-revision.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectRevisionResolverService implements Resolve<ProjectRevisionMeta[]> {

  constructor(
    private projectRevisionService: ProjectRevisionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ProjectRevisionMeta[]> {
    return this.projectRevisionService.getRevision(
      route.paramMap.get('id'),
      Number(route.paramMap.get('revision_id'))
    );
  }
}
