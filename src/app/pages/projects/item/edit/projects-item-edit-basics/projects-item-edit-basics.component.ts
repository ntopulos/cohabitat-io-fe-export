import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/helpers/pending-changes.guard';

@Component({
  selector: 'app-projects-item-edit-basics',
  templateUrl: './projects-item-edit-basics.component.html',
  styleUrls: ['./projects-item-edit-basics.component.sass'],
  host: {
    id: 'projects-create'
  }
})
export class ProjectsItemEditBasicsComponent implements ComponentCanDeactivate {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !(this.formEdited);
  }

  public formEdited = false;
  public setFormEdited(value) {
    this.formEdited = value;
  }
}
