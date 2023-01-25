import {Deserializable} from "./deserializable.model";

export class ObjectText implements Deserializable {
  public type: 'long' | 'short';
  public lang: string;
  public text: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
