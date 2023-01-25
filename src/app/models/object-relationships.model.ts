import { Deserializable } from './deserializable.model';

export class ObjectRelationships implements Deserializable {

  image?: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
