import { Deserializable } from '../deserializable.model';
import {ProjectRevisionAttributes} from './project-revision-attributes.model';

export class ProjectRevision implements Deserializable {
  id: number;
  type: string;

  attributes: ProjectRevisionAttributes;
  relationships: any

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
