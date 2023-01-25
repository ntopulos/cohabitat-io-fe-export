import { Filetype } from './filetype.model';

export class FiletypesMeta {

  public filetypes: Filetype[] = [];

  constructor(r) {
    r.data.forEach(e => {
      this.filetypes.push(new Filetype(e, r.included))
    });
  }
}
