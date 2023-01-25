import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project/project.model';

@Component({
  selector: 'app-object-videos',
  templateUrl: './object-videos.component.html',
  styleUrls: ['./object-videos.component.sass']
})
export class ObjectVideosComponent implements OnInit {

  public videos = [];

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set Project(project: Project) {

    if (project && project.attributes['videos']) {
      project.attributes['videos'].forEach(element => {

        let url: string;
        if (element.type === 'youtube') {
          url = 'https://www.youtube-nocookie.com/embed/' + element.id;
        } else if (element.type === 'vimeo') {
          url = 'https://player.vimeo.com/video/' + element.id;
        }

        this.videos.push({
          id: element.id,
          type: element.type,
          order: element.order,
          url: url
        });
      });
    }
  }
}
