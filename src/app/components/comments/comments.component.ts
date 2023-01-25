import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommentsMeta } from 'src/app/models/comments-meta.model';
import { FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { take } from 'rxjs/operators';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {

  @Input() project_id?: string;
  @Input() partner_id?: string;
  @Output() commentsLoaded: EventEmitter<number> = new EventEmitter<number>();

  public comments: CommentsMeta;
  public loadingMore: boolean = false;

  public form = new FormGroup({});
  public formValues = {};
  public formStatus = {
    submitting: false,
  };

  public fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'textarea',
      templateOptions: {
        label: 'Comment',
        required: true
      }
    }
  ];

  constructor(
    private commentService: CommentService,
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(page: number = 1) {

    this.loadingMore = page > 1;

    if (this.project_id) {
      this.commentService.getProjectComments(this.project_id, page)
        .pipe(take(1))
        .subscribe(
          r => {
            if (page == 1) {
              this.comments = r;
            } else {
              r.comments.forEach(comment => {
                this.comments.comments.push(comment);
              });
              this.comments.pagination = r.pagination
            }
            this.loadingMore = false;
            this.commentsLoaded.emit(this.comments.pagination['total']);
          }
        );
    }

    if (this.partner_id) {
      this.commentService.getPartnerComments(this.partner_id, page)
        .pipe(take(1))
        .subscribe(
          r => {
            if (page == 1) {
              this.comments = r;
            } else {
              r.comments.forEach(comment => {
                this.comments.comments.push(comment);
              });
              this.comments.pagination = r.pagination
            }
            this.loadingMore = false;
            this.commentsLoaded.emit(this.comments.pagination['total']);
          }
        );
    }
  }

  postComment() {
    if (this.form.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.formStatus.submitting = true;

    if (this.project_id) {
      this.commentService.createProjectComment(this.project_id, this.formValues)
      .subscribe(
        data => {
          this.notificationService.notification$.next({
            content: 'Comment published',
            type: 'success'
          });
          this.formValues = {};
          this.getComments();
        },
        error => {
          console.log(error)
          this.notificationService.notification$.next({
            content: error.error.errors,
            type: 'danger'
          });
      })
      .add(() => this.formStatus.submitting = false);
    }


    if (this.partner_id) {
      this.commentService.createPartnerComment(this.partner_id, this.formValues)
      .subscribe(
        data => {
          this.notificationService.notification$.next({
            content: 'Comment published',
            type: 'success'
          });
          this.formValues = {};
          this.getComments();
        },
        error => {
          console.log(error)
          this.notificationService.notification$.next({
            content: error.error.errors,
            type: 'danger'
          });
      })
      .add(() => this.formStatus.submitting = false);
    }
  }
}
