import { Component, OnInit, Input } from '@angular/core';
import { Included } from 'src/app/models/included.model';
import { ObjectRelationships } from 'src/app/models/object-relationships.model';

@Component({
  selector: 'app-object-image',
  templateUrl: './object-image.component.html',
  styleUrls: ['./object-image.component.sass']
})

export class ObjectImageComponent implements OnInit {

  image: any;

  ngOnInit() {
    if (this.relationships.image) {
      var imageObjectFiles = this.included.filter(x => x.type === 'objects-files')
        .find(x => x.id === this.relationships.image.data.id);
      this.image = this.included.filter(x => x.type === "files")
        .find(x => x.id == imageObjectFiles.relationships.file.data.id)
    }
  }

  @Input() relationships: ObjectRelationships;
  @Input() included: Included[];
}
