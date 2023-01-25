import {Deserializable} from "./deserializable.model";

export class Pagination implements Deserializable {

  constructor(r) {
    this.deserialize(r)
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
