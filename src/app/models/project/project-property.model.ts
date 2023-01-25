import { Deserializable } from '../deserializable.model';

export class ProjectProperty implements Deserializable {

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
