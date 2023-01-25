import { Included } from './included.model';
import { Deserializable } from './deserializable.model';
import { Tagsgroup } from './tagsgroup.model';

export class TagsgroupMeta implements Deserializable {

  public tagsGroup: Tagsgroup[];
  public included:Array<Included>;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  constructor(r) {
    this.tagsGroup = r.data;
    this.included = r.included;
  }
}
