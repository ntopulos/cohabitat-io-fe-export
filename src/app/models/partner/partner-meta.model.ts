import { Included } from '../included.model';
import { Partner } from './partner.model';

export class PartnerMeta {

  partner: Partner;
  included: Included;

  constructor(r) {
    this.partner = r.data;
    this.included = r.included;
  }
}
