import { Attributes } from '../attributes.model';
import { ProjectRelationships } from "./project-relationships.model";

export class Project {
  id: string;
  attributes: Attributes;
  relationships: ProjectRelationships;
}
