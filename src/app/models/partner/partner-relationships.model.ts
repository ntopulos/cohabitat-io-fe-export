import { Deserializable } from '../deserializable.model';

export class PartnerRelationships implements Deserializable {

  tags?: any;
  properties?: any;
  image?: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
