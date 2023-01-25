import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ObjectFilesMeta } from '../models/objet-files-meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectFilesResolverService implements Resolve<ObjectFilesMeta> {

  constructor(
    private projectService: ProjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<ObjectFilesMeta> {
    return this.projectService.getFiles(route.paramMap.get('id'));
  }
}
