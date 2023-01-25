import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/helpers/pending-changes.guard';

@Component({
  selector: 'app-partners-item-edit-basics',
  templateUrl: './partners-item-edit-basics.component.html',
  styleUrls: ['./partners-item-edit-basics.component.sass'],
  host: {
    id: 'partners-create'
  }
})
export class PartnersItemEditBasicsComponent implements ComponentCanDeactivate {

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return !(this.formEdited);
  }

  public formEdited = false;
  public setFormEdited(value) {
    this.formEdited = value;
  }
}
