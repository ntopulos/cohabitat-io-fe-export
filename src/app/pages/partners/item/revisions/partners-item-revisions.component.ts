import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/models/partner/partner.model';

@Component({
  selector: 'app-partners-item-revisions',
  templateUrl: './partners-item-revisions.component.html',
  styleUrls: ['./partners-item-revisions.component.sass'],
  host: {
    class: 'content-medium'
  }
})
export class PartnersItemRevisionsComponent implements OnInit {

  public partner: Partner;
  public revisions;
  public displayedColumns: string[] = ['date', 'author', 'description'];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.partner = data.partnerMeta.partner;

      let users = data.partnerRevisionsMeta.included

      this.revisions = data.partnerRevisionsMeta.data.map(function(r) {
        let user = users.find(u => u.id === r.relationships.user.data.id);
        const u = {
          id: user.id,
          name: user.attributes.name,
        }
        return {
          id: r.id,
          date: r.attributes.created_at,
          description: r.attributes.description,
          deleted: r.attributes.deleted,
          user: u,
        }
      });
    });
  }
}
