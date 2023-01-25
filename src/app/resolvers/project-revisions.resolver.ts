import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectRevisionsMeta } from '../models/project/project-revisions-meta.model';
import { ProjectRevisionService } from '../services/project-revision.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectRevisionsResolverService implements Resolve<ProjectRevisionsMeta[]> {

  constructor(
    private projectRevisionService: ProjectRevisionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ProjectRevisionsMeta[]> {
    return this.projectRevisionService.getRevisions(route.paramMap.get('id'));
  }
}
