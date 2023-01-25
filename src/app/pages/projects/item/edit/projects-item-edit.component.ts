import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-projects-item-edit',
  templateUrl: './projects-item-edit.component.html',
  styleUrls: ['./projects-item-edit.component.sass'],
  host: {
    class: 'content-medium',
  },
  providers: [ProjectService]
})
export class ProjectsItemEditComponent implements OnInit {

  public project: Project;
  public navLinks;
  public navLinkActive: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.projectMeta.project;
      this.navLinkActive = this.route.firstChild.routeConfig.path;
    });

    this.navLinks = [
      'basics',
      'properties',
      'links',
      'texts',
      'images',
      'videos',
    ];

    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((event) => {
        // console.log(this.route.firstChild.routeConfig.path);
        this.navLinkActive = this.route.firstChild.routeConfig.path;
      });
  }

}
