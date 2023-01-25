import { Component, Input, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/partner/partner.model';

@Component({
  selector: 'app-partner-partnerships',
  templateUrl: './partner-partnerships.component.html',
  styleUrls: ['./partner-partnerships.component.sass']
})
export class PartnerPartnershipsComponent implements OnInit {

  partnerships = [];
  projects = [];
  formattedPartnerships = [];

  ngOnInit() {
    this.partnerships.forEach(p => {
      this.formattedPartnerships.push({
        id: p.id,
        project: this.projects.find(project => project.id === p.project_uuid),
        tagsgroups: p.tagsgroups
      });
    });
  }

  @Input()
  set Partner(partner: Partner) {
    if (partner && partner.attributes['partnerships']) {
      this.partnerships = partner.attributes['partnerships'];
    }
  };

  @Input()
  set Included(included: any) {
    if (included) {
      this.projects = included.filter(o => o['type'] === 'projects');
    }
  };
}
