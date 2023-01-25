import { Deserializable } from './deserializable.model';

export class Tagsgroup implements Deserializable {

  public id: string;
  public attributes: any;
  public relationships: any;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
