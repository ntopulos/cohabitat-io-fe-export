export class UserSelf {
  uuid: string;
  name: string;
  email: string;

  public initializeFromRequest(r) {
    this.uuid = r.data.uuid;
    this.name = r.data.name;
    this.email = r.data.email;
  }
}
