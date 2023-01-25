import { Attributes } from './attributes.model';
import { FiletypeAllowedFormat } from './filetypeallowedformat.model';

export class Filetype {
  id: string;
  attributes: Attributes;
  allowedFormats: FiletypeAllowedFormat[];

  constructor(filetype, allowedFormats) {
    this.id = filetype.id
    this.attributes = filetype.attributes

    // temp array of allowed filetypes
    var allowedRef = [];
    filetype.relationships.allowed_formats.data.forEach(a => {
      allowedRef.push(a.id)
    });

    this.allowedFormats = allowedFormats.filter(
      af => allowedRef.includes(af.id) && af.type === 'filetypes-allowed-formats'
    );
  }

}
