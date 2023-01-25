import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.sass'],
  host: {
    class: 'content-medium',
    id: 'projects-create'
  }
})
export class ProjectsCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
