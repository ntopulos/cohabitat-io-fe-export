import { Attributes } from '../attributes.model';
import { PartnerRelationships } from './partner-relationships.model';

export class Partner {
  id: string;
  attributes: Attributes;
  relationships: PartnerRelationships;
}
