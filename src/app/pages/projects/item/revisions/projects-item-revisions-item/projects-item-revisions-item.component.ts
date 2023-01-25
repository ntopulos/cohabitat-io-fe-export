import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-projects-item-revisions-item',
  templateUrl: './projects-item-revisions-item.component.html',
  styleUrls: ['./projects-item-revisions-item.component.sass']
})
export class ProjectsItemRevisionsItemComponent implements OnInit {

  public routerData: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe(data => {
      this.routerData = data;
      this.titleService.setTitle(
        data.projectRevisionMeta.data.attributes.basics.name +
        ' - CoHabitat.io'
      );
    });
  }
}
