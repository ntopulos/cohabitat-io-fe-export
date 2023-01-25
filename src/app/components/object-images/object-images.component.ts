import { Component, OnInit, Input } from '@angular/core';
import { ObjectFilesMeta } from 'src/app/models/objet-files-meta.model';

@Component({
  selector: 'app-object-images',
  templateUrl: './object-images.component.html',
  styleUrls: ['./object-images.component.sass']
})
export class ObjectImagesComponent implements OnInit {

  public images;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set ObjectFilesMeta(ObjectFilesMeta: ObjectFilesMeta) {
    if (ObjectFilesMeta && ObjectFilesMeta.included) {
      this.images = ObjectFilesMeta.included.filter(x => x.type === 'files');
    }
  }
}
