import { ObjectFile } from "./object-file.model";
import { Deserializable } from "./deserializable.model";
import { Included } from './included.model';

export class ObjectFilesMeta implements Deserializable {

  public objectFile: ObjectFile[];
  public included: Included[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  constructor(r) {
    if (r) {
      this.objectFile = r.data;
      this.included = r.included;
    }
  }
}
