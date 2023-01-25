import { Deserializable } from '../deserializable.model';
import { PartnerRevisionAttributes } from './partner-revision-attributes.model';

export class PartnerRevision implements Deserializable {
  id: number;
  type: string;

  attributes: PartnerRevisionAttributes;
  relationships: any

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
