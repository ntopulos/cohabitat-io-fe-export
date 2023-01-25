import { Included } from '../included.model';
import { Partner } from './partner.model';

export class PartnersMeta {

  public partners: Partner[];
  public included: Included;

  constructor(r) {
    this.partners = r.data;
    this.included = r.included;
  }
}
