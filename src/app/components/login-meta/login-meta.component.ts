import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-meta',
  templateUrl: './login-meta.component.html',
  styleUrls: ['./login-meta.component.sass']
})
export class LoginMetaComponent implements OnInit {

  public form = new FormGroup({});
  public formValues = {};
  public fields: FormlyFieldConfig[];
  public formStatus = {
    submitting: false,
  };

  @Output() loginEvent = new EventEmitter();

  constructor(
    public authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    ) { }

  ngOnInit() {
    // Create form
    this.fields = [
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

    this.authenticationService.login(
      this.formValues['email'],
      this.formValues['password']
    ).subscribe(
      data => {
        this.notificationService.notification$.next({
          content: 'You are logged in.',
          type: 'success'
        });
        this.loginEvent.emit()
      },
      error => {
        this.notificationService.notification$.next({
          content: 'Invalid credentials',
          type: 'danger'
        });
      }
    )
    .add(() => this.formStatus.submitting = false);
  }
}
