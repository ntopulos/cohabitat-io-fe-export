import {Comment} from "./comment.model";
import { Pagination } from './pagination.model';

export class CommentsMeta {
  public comments: Comment[] = [];
  public pagination: Pagination;

  constructor(r) {
    r.data.forEach(e => {
      this.comments.push(new Comment(e, r.included))
    });
    this.pagination = r.meta.pagination;
  }
}
