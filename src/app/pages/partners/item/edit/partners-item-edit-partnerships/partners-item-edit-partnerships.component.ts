import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Partner } from 'src/app/models/partner/partner.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TagsHelper } from 'src/app/helpers/tags.helper';
import { PartnerService } from 'src/app/services/partner.service';
import { Included } from 'src/app/models/included.model';

@Component({
  selector: 'app-partners-item-edit-partnerships',
  templateUrl: './partners-item-edit-partnerships.component.html',
  styleUrls: ['./partners-item-edit-partnerships.component.sass']
})
export class PartnersItemEditPartnershipsComponent implements OnInit {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !(this.form.dirty);
  }

  public partner: Partner;
  public included: Included;
  public form = new FormGroup({});
  public formValues = {partnerships: []};
  public formStatus = {
    submitting: false,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'partnerships',
      type: 'repeat',
      templateOptions: {
        addText: 'Add a partnership',
      },
      fieldArray: {
        fieldGroup: [
          {
            key: 'project_uuid',
            type: 'project-select',
            templateOptions: {}
          },
          {
            key: 'tagsgroups',
            type: 'multicheckbox',
            templateOptions: {
              label: 'Domain',
              required: true,
              options: [],
            },
            validators: {
              required: control => !control.value ||
              Object.keys(control.value).map(key => control.value[key]).some(val => val === true),
            },
          }
        ],
      },
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'text',
        label: 'Description of your modifications',
      }
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private tagsHelper: TagsHelper,
    private partnerService: PartnerService
    ) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      // General
      this.partner = data.partnerMeta.partner;
      this.included = data.partnerMeta.included;

      // Setup tags
      var allTags= this.tagsHelper.getAllGroupsWithTags(data.tagsgroupsMeta);
      var formOptions = [];
      allTags.forEach(tg => {
        formOptions.push({
          value: tg.slug,
          label: tg.details[0].name,
        });
      });
      this.fields[0]['fieldArray']['fieldGroup'][1]['templateOptions']['options'] = formOptions;

      // Transmit data to form
      this.fields[0]['fieldArray']['fieldGroup'][0]['templateOptions']['included'] = this.included;

      // Populate form
      this.populateForm(this.partner.attributes['partnerships']);
    });
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

    // Format array in case of removal of all partnerships
    let inputValues = JSON.parse(JSON.stringify(this.formValues))

    if(this.formValues['partnerships'].length == 0) {
      inputValues.partnerships = [null];
    } else {
      // Format tagsgroups input
      inputValues.partnerships.forEach(function (p, index) {
        let newFormat = [];
        for (const [key, value] of Object.entries(p.tagsgroups)) {
          if (value) {
            newFormat.push(key);
          }
        }
        inputValues.partnerships[index]['tagsgroups'] = newFormat;
      });
    }

    this.partnerService.updatePartner(this.partner.id, inputValues)
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
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      }
    )
    .add(() => this.formStatus.submitting = false);
  }

  private populateForm(data:Array<any>) {
    if (data) {
      data.forEach(e => {
        var tagsgroups = {};
        e.tagsgroups.forEach(tgin => {
          tagsgroups[tgin] = true;
        });
        this.formValues.partnerships.push({
            project_uuid: e.project_uuid,
            tagsgroups: tagsgroups
          }
        );
      });
    }
  }

}
