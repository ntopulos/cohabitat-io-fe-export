import {ProjectRevision} from './project-revision.model';

export class ProjectRevisionMeta {

  revision: ProjectRevision;
  included: any;

  constructor(r) {
    this.revision = r.data;
    this.included = r.included;
  }
}
