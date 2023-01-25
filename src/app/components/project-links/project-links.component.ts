import { Component, OnInit, Input } from '@angular/core';
import { ObjectNetlink } from 'src/app/models/object-netlink.model';

@Component({
  selector: 'app-project-links',
  templateUrl: './project-links.component.html',
  styleUrls: ['./project-links.component.sass']
})
export class ProjectLinksComponent implements OnInit {
  official: ObjectNetlink;
  socials: ObjectNetlink[];
  frees: ObjectNetlink[];

  ngOnInit() {
    if (this.netlinks) {
      this.official = this.netlinks.find(x => x.type === 'official');
      this.socials = this.netlinks.filter(x => x.type.match(/\bsocial:\b/g));
      this.frees = this.netlinks.filter(x => x.type === 'free');
    }
  }

  @Input() netlinks: ObjectNetlink[];
}
