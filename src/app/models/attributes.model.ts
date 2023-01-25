import { Deserializable } from "./deserializable.model";
import { Address } from "./address.model";
import { ObjectText } from "./objecttext.model";
import { ObjectNetlink } from "./object-netlink.model";
import { ObjectCoordinates } from "./object-coordinates.model";

export class Attributes implements Deserializable {
  name: string;
  name_short: any;
  country_code: string;
  status: string;
  address: Address;

  texts: ObjectText[];
  netlinks: ObjectNetlink[];
  coordinates: ObjectCoordinates;

  deserialize(input: any) {
    Object.assign(this, input);

    // Iterate over all object texts for this project and map them to a proper `ObjectText` model
    this.texts = input.texts.map(text => new ObjectText().deserialize(text));

    return this;
  }
}
