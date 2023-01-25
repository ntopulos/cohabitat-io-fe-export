import { Deserializable } from '../deserializable.model';

export class ProjectRevisionAttributes implements Deserializable {
  created_at: string;
  description: string;
  reversion_to_id: boolean;
  deleted: boolean;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
