export class AuthToken {
  token_type: string;
  expires: number;
  access_token: string;
  refresh_token: string;

  constructor(r) {
    this.token_type = r.token_type;

    // Convert expire_in to an absolute value
    var t = new Date();
    this.expires = t.setSeconds(t.getSeconds() + r.expires_in);

    this.access_token = r.access_token;
    this.refresh_token = r.refresh_token;
  }
}
