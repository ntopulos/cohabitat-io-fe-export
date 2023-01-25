import { Component, Input, SimpleChanges } from '@angular/core';
import { Project } from 'src/app/models/project/project.model';
import { Included } from 'src/app/models/included.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-object-drawer',
  templateUrl: './object-drawer.component.html',
  styleUrls: ['./object-drawer.component.sass'],
  animations: [
    trigger('fadeInOut', [
      state('open', style({
        maxHeight: 215
      })),
      state('closed', style({
        maxHeight: 0
      })),
      transition('closed=>open', animate('350ms ease-in-out')),
      transition('open=>closed', animate('350ms ease-in-out'))
    ]),
    trigger('expand', [
      transition('*=>expanded', animate(100, style({height: 'calc(80vh - 60px)'})))
    ])
  ]
})
export class ObjectDrawerComponent {
  currentState: string = 'closed';
  expandState: string = '';
  image: any;

  @Input() project: Project;
  @Input() included: Included[];

  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.project) {
      if (this.project.relationships.image) {
        var imageObjectFiles = this.included.filter(x => x.type === 'objects-files')
          .find(x => x.id === this.project.relationships.image.data.id);
        this.image = this.included.filter(x => x.type === "files")
          .find(x => x.id == imageObjectFiles.relationships.file.data.id);
      } else {
        this.image = null;
      }
      this.open();
    } else {
      this.close();
    }
  }

  toggleState() {
    this.currentState = this.currentState === 'closed' ? 'open' : 'closed';
  }
  close() {
    this.currentState = 'closed';
  }
  open() {
    this.currentState = 'open';
  }

  swipeup() {
    this.expandState = 'expanded';
  }

  goToProject() {
    if(this.project) {
      let translatedPath: any = this.localize.translateRoute('/projects/'+this.project.id);
      this.router.navigateByUrl(translatedPath);
    }
  }
}
