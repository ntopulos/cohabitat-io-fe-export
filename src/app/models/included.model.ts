import {Deserializable} from "./deserializable.model";

export class Included implements Deserializable {

  type: string;
  id: any;
  relationships?: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
