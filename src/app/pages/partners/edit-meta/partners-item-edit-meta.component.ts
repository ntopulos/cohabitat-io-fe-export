import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Partner } from 'src/app/models/partner/partner.model';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners-item-edit-meta',
  templateUrl: './partners-item-edit-meta.component.html',
  styleUrls: ['./partners-item-edit-meta.component.sass']
})
export class PartnersItemEditMetaComponent implements OnInit {

  public partner: Partner;
  public partnerCreated: Partner;
  public createdPartner;
  private initialMapCenter = {
    lat: 46.95,
    lng: 7.45
  };
  public formStatus = {
    submitting: false,
  };

  public currentLang: any;

  public form = new FormGroup({});
  public formValues;
  public fields: FormlyFieldConfig[] = [
    {
      key: 'basics',
      fieldGroup: [{
        key: 'name',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Name',
        },
      },
      {
        key: 'name_short',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Short name',
        },
      },
      {
        key: 'status_slug',
      },
      {
        key: 'coordinates',
        fieldGroup: [{
          key: 'latitude',
        },{
          key: 'longitude',
        }]
      }
    ],
    },
  ];

  @Output() formChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService,
    private translate: TranslateService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;

    this.route.data.subscribe(data => {
      // if is edit
      if (data.partnerMeta) {
        this.partner = data.partnerMeta.partner;

        this.formValues = {
          basics: {
            name: this.partner.attributes.name,
            name_short: this.partner.attributes.name_short,
            status_slug: 'living',
            coordinates: {
              latitude: this.partner.attributes.coordinates.lat,
              longitude: this.partner.attributes.coordinates.lng,
            }
          },
          tagsgroups: [
            'organisation'
          ]
        }
      } else {
        this.formValues = {
          basics: {
            status_slug: 'living',
            coordinates: {
              latitude: this.initialMapCenter.lat,
              longitude: this.initialMapCenter.lng,
            }
          },
          tagsgroups: [
            'organisation'
          ]
        }
      }

      if (this.partner) {
        this.addRevisionDescription();

        setTimeout( () => {
          // Emit value change for alert on navigation
          this.form.valueChanges.subscribe(
            result => {
              this.formChanged.emit(true);
            }
          );
        }, 1 );
      }
    });
  }

  private addRevisionDescription() {
    if (this.fields.length < 2) {
      this.fields.push({
        key: 'description',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Description of your modifications',
        }
      });
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
    let input = JSON.parse(JSON.stringify(this.formValues))

    if (!input.basics.name_short) {
      delete input.basics.name_short;
    }

    if (this.partner) {
      this.updatePartner(input);
    } else {
      this.createPartner(input);
    }
  }

  private updatePartner(input) {
    this.partnerService.updatePartner(this.partner.id, input)
    .subscribe(
      data => {
        this.notificationService.notification$.next({
          content: 'Partner updated',
          type: 'success'
        });
        // this.form.get('description').setValue('');
        this.form.markAsPristine();
        this.formChanged.emit(false);
      },
      error => {
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      },
    )
    .add(() => this.formStatus.submitting = false);
  }

  private createPartner(input) {
    this.partnerService.createPartner(input)
    .subscribe(
      data => {
        this.partnerCreated = data.partner;
      },
      error => {
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      },
    )
    .add(() => this.formStatus.submitting = false);
  }

  // Convert tags format to the format of the API input
  private formatTags(inputTags)
  {
    var tags = [];
    for (var group in inputTags) {
      var groupTags = inputTags[group];
      for (var t in groupTags) {
        if (groupTags[t]) {
          tags.push({
            "group": group,
            "slug": t
          })
        }
      }
    }
    return tags;
  }

  public mapMoved(value) {
    this.formChanged.emit(true);
  }

}
