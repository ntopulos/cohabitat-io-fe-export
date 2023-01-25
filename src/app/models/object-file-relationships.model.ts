import {Deserializable} from "./deserializable.model";

export class ObjectFileRelationships implements Deserializable {

  file?: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
