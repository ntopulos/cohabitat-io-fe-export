import {Project} from './project.model';
import { Included } from '../included.model';

export class ProjectMeta {

  project: Project;
  included: Included;

  constructor(r) {
    this.project = r.data;
    this.included = r.included;
  }
}
