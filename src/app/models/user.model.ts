export class User {
  uuid: string;
  name: string;

  public constructor(r) {
    this.uuid = r.id;
    this.name = r.attributes.name;
  }
}
