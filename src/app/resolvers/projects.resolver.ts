import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectsMeta } from '../models/project/projects-meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectsResolverService implements Resolve<ProjectsMeta> {

  constructor(
    private projectService: ProjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ProjectsMeta> {
    return this.projectService.getProjects();
  }
}
