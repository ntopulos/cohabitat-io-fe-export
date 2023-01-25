import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-account-password-reset',
  templateUrl: './account-password-reset.component.html',
  styleUrls: ['./account-password-reset.component.sass'],
  host: {
    class: 'content-small'
  }
})
export class AccountPasswordResetComponent implements OnInit {

  public token;

  public tokenForm = new FormGroup({});
  public tokenFormValues = {};
  public tokenFormFields: FormlyFieldConfig[];
  public tokenFormStatus = {
    submitting: false,
    success: false
  };

  public resetForm = new FormGroup({});
  public resetFormValues = {};
  public resetFormFields: FormlyFieldConfig[];
  public resetFormStatus = {
    submitting: false,
    success: false
  };

  constructor(
    private route: ActivatedRoute,
    public AuthenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

    // Create form
    if (!this.token) {
      this.tokenFormFields = [
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'email',
            label: 'Email',
          },
          validators: {
            email: {
              expression: (c) => !c.value || /\S+@\S+\.\S+/.test(c.value),
            },
          }
        }
      ];
    } else {
      this.resetFormFields = [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'password',
            label: 'New password',
          }
        }
      ];
    }
  }

  public submitToken() {
    if (this.tokenForm.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.tokenFormStatus.submitting = true;

    this.AuthenticationService.resetPasswordToken(
      this.tokenFormValues['email']
    ).subscribe(
      data => {
        this.tokenFormStatus.success = true;
      },
      error => {
        console.log(error);
        this.notificationService.notification$.next({
          content: 'Invalid input',
          type: 'danger'
        });
      }
    )
    .add(() => this.tokenFormStatus.submitting = false);
  }

  public submitPassword() {
    if (this.resetForm.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.resetFormStatus.submitting = true;

    this.AuthenticationService.resetPassword(
      this.token,
      this.resetFormValues['password']
    ).subscribe(
      data => {
        this.resetFormStatus.success = true;
      },
      error => {
        let errors = ['Error'];
        if (error.error.errors) {
          errors = error.error.errors;
        }
        this.notificationService.notification$.next({
          content: errors,
          type: 'danger'
        });
      }
    )
    .add(() => this.resetFormStatus.submitting = false);
  }
}
