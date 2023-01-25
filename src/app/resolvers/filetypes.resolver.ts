import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FiletypeService } from '../services/filetype.service';
import { FiletypesMeta } from '../models/filetypes-meta.model';

@Injectable({
  providedIn: 'root'
})

export class FiletypesResolverService implements Resolve<FiletypesMeta> {

  constructor(
    private filetypeService: FiletypeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<FiletypesMeta> {
    return this.filetypeService.getFiletypes();
  }
}
