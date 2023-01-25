import { ObjectProperty } from '../object-property.model';
import { Included } from '../included.model';


export class ProjectPropertiesMeta {

  public properties: ObjectProperty[];
  public included:Array<Included>;

  constructor(r) {
    this.properties = r.data;
    this.included = r.included;
  }
}
