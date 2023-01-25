import {Project} from "./project.model";
import { Included } from '../included.model';

export class ProjectsMeta {

  public projects: Project[];
  public included: Included;

  constructor(r) {
    this.projects = r.data;
    this.included = r.included;
  }
}
