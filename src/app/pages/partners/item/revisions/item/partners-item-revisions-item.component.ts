import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partners-item-revisions-item',
  templateUrl: './partners-item-revisions-item.component.html',
})
export class PartnersItemRevisionsItemComponent implements OnInit {

  public routerData: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.routerData = data;
      console.log(data)
      this.titleService.setTitle(
        data.partnerRevisionMeta.data.attributes.basics.name +
        ' - CoHabitat.io'
      );
    });
  }
}
