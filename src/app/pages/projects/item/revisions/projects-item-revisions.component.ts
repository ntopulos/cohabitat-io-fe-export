import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project/project.model';

@Component({
  selector: 'app-projects-item-revisions',
  templateUrl: './projects-item-revisions.component.html',
  styleUrls: ['./projects-item-revisions.component.sass'],
  host: {
    class: 'content-medium'
  }
})
export class ProjectsItemRevisionsComponent implements OnInit {

  public project: Project;
  public revisions;
  public displayedColumns: string[] = ['date', 'author', 'description'];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.projectMeta.project;

      let users = data.projectRevisionsMeta.included

      this.revisions = data.projectRevisionsMeta.data.map(function(r) {
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
