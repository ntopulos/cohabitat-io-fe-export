import { PartnerRevision } from './partner-revision.model';

export class PartnerRevisionMeta {

  revision: PartnerRevision;
  included: any;

  constructor(r) {
    this.revision = r.data;
    this.included = r.included;
  }
}
