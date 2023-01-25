import { Deserializable } from "./deserializable.model";

export class ObjectFile implements Deserializable {
  id: number;
  relationships: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
