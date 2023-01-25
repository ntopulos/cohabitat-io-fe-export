import { Deserializable } from '../deserializable.model';

export class ProjectImage implements Deserializable {

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
