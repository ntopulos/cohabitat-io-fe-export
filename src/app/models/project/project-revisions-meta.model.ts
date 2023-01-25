import {ProjectRevision} from './project-revision.model';
import { Deserializable } from '../deserializable.model';

export class ProjectRevisionsMeta implements Deserializable {

  revisions: ProjectRevision[];
  included: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  constructor(r) {
    this.revisions = r.data;
    this.included = r.included;
  }
}
