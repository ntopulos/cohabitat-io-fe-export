import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/helpers/pending-changes.guard';
import { Partner } from 'src/app/models/partner/partner.model';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners-item-edit-texts',
  templateUrl: './partners-item-edit-texts.component.html',
  styleUrls: ['./partners-item-edit-texts.component.sass'],
  host: {
    class: 'project-item-edit-texts'
  }
})
export class PartnersItemEditTextsComponent implements OnInit, ComponentCanDeactivate {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !(this.form.dirty)
  }

  public partner: Partner;
  public form = new FormGroup({});
  public formValues;
  public fields: FormlyFieldConfig[];
  public formStatus = {
    submitting: false,
  };

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private partnerService: PartnerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe(data => {
      this.partner = data.partnerMeta.partner;

      // Create form
      this.fields = [
        {
          key: 'texts',
          fieldGroup: [
            {
              key: 'short',
              type: 'input',
              templateOptions: {
                required: true,
                type: 'text',
                label: 'Short',
                maxLength: 200,
              },
              expressionProperties: {
                'templateOptions.description': '"Max: " + field.templateOptions.maxLength + " characters"',
              }
            },
            {
              template: '<div class="form-help"><p>The long text supports the <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown syntax</a>.</p></div>'
            },
            {
              key: 'long',
              type: 'textarea',
              templateOptions: {
                label: 'Long',
              }
            }
          ]
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Description of your modifications',
          }
        }
      ];

      this.populateForm();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.populateForm();
    });
  }

  private populateForm() {
    this.formValues = {
      texts: {}
    };

    this.setFormTextValue('short');
    this.setFormTextValue('long');
  }

  private setFormTextValue(textType: string) {
    if (this.partner.attributes.texts) {
      let found = this.partner.attributes.texts.find(x => x.type === textType && x.lang === this.translate.currentLang);
      if (found) {
        this.formValues.texts[textType] = found.text;
      }
    }
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

    // Format input
    let input = {
      description: this.formValues['description'],
      texts: {
        short: this.formValues.texts['short']
      }
    }

    if (this.formValues.texts['long']) {
      input.texts['long'] = this.formValues.texts['long'];
    }

    this.partnerService.updatePartner(this.partner.id, input)
    .subscribe(
      data => {
        this.notificationService.notification$.next({
          content: 'Partner updated',
          type: 'success'
        });
        this.form.markAsPristine();
      },
      error => {
        console.log(error)
        this.formStatus.submitting = false;
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      }
    )
    .add(() => this.formStatus.submitting = false);
  }
}
