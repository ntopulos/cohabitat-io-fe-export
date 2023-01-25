import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/partner/partner.model';
import { PartnerService } from 'src/app/services/partner.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-partners-item-edit',
  templateUrl: './partners-item-edit.component.html',
  styleUrls: ['./partners-item-edit.component.sass'],
  host: {
    class: 'content-medium',
  },
  providers: [PartnerService]
})
export class PartnersItemEditComponent implements OnInit {

  public partner: Partner;
  public navLinks;
  public navLinkActive: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.partner = data.partnerMeta.partner;
      this.navLinkActive = this.route.firstChild.routeConfig.path;
    });

    this.navLinks = [
      'basics',
      'links',
      'texts',
      'partnerships',
      'videos',
    ];

    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((event) => {
        // console.log(this.route.firstChild.routeConfig.path);
        this.navLinkActive = this.route.firstChild.routeConfig.path;
      });
  }

}
