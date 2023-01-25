import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  host: {
    class: 'content-small'
  }
})
export class RegisterComponent implements OnInit {

  public form = new FormGroup({});
  public formValues = {};
  public fields: FormlyFieldConfig[];
  public formStatus = {
    submitting: false,
    success: false
  };
  public register;

  constructor(
    public authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    ) { }

  ngOnInit() {
    // For inner translation
    this.register = {
      value: this.translate.instant('authentication.register.form.button')
    }

    // Create form
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Name'
        }
      },
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
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          required: true,
          minLength: 6,
          type: 'password',
          label: 'Password',
        }
      }
    ];
  }

  public submit() {
    if (this.form.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.formStatus.submitting = true;

    this.authenticationService.register(
      this.formValues['name'],
      this.formValues['email'],
      this.formValues['password'])
      .subscribe(
        data => {
          this.formStatus.success = true;
        },
        error => {
          this.notificationService.notification$.next({
            content: error.error.errors,
            type: 'danger'
          });
        }
      )
      .add(() => this.formStatus.submitting = false);
  }
}
