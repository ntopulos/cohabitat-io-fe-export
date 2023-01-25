import { Deserializable } from '../deserializable.model';
import { PartnerRevision } from './partner-revision.model';

export class PartnerRevisionsMeta implements Deserializable {

  revisions: PartnerRevision[];
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
