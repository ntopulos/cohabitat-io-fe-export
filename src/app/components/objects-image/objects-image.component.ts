import { Component, Input, OnInit } from '@angular/core';
import { Included } from 'src/app/models/included.model';
import { ObjectRelationships } from 'src/app/models/object-relationships.model';

@Component({
  selector: 'app-objects-image',
  templateUrl: './objects-image.component.html',
  styleUrls: ['./objects-image.component.sass']
})
export class ObjectsImageComponent implements OnInit {

  image: any;

  ngOnInit() {
    if (this.relationships.image) {
      var imageObjectFiles = this.included.filter(x => x.type === 'objects-files')
        .find(x => x.id === this.relationships.image.data.id);
      this.image = this.included.filter(x => x.type === "files")
        .find(x => x.id == imageObjectFiles.relationships.file.data.id);
    }
  }

  @Input() relationships: ObjectRelationships;
  @Input() included: Included[];
}
