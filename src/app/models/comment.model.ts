import {Attributes} from "./attributes.model";
import { User } from './user.model';

export class Comment {

  id: number;
  attributes: Attributes;
  author: User;

  constructor(comment, users) {
    this.id = comment.id
    this.attributes = comment.attributes
    this.author = new User(
      users.find(u => u.id === comment.relationships.user.data.id)
    );
  }
}
