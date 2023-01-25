import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Project } from 'src/app/models/project/project.model';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.sass'],
})
export class ProjectsItemComponent implements OnInit {

  public routerData: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.routerData = data;
      let project: Project = data.projectMeta.project;

      this.titleService.setTitle(
        project.attributes.name +
        ' - CoHabitat.io'
      );
    });
  }
}
