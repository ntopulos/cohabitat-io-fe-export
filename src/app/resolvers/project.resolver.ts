import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectMeta } from '../models/project/project-meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectResolverService implements Resolve<ProjectMeta> {

  constructor(
    private projectService: ProjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ProjectMeta> {
    return this.projectService.getProject(route.paramMap.get('id'));
  }
}
