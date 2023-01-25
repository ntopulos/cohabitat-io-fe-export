import { Deserializable } from '../deserializable.model';

export class PartnerTag implements Deserializable {

  id: number;
  data: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
