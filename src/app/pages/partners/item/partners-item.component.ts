import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Partner } from 'src/app/models/partner/partner.model';

@Component({
  selector: 'app-partners-item',
  templateUrl: './partners-item.component.html',
  styleUrls: ['./partners-item.component.sass'],
})
export class PartnersItemComponent implements OnInit {

  public routerData: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.routerData = data;
      let partner: Partner = data.partnerMeta.partner;

      this.titleService.setTitle(
        partner.attributes.name +
        ' - CoHabitat.io'
      );
    });
  }
}
