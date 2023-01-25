import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <mat-card *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-field [field]="field"></formly-field>
      <div>
        <button mat-button color="warn" type="button" (click)="remove(i)" tabindex="-1">Remove</button>
      </div>
    </mat-card>
    <div>
      <button mat-button type="button" (click)="add()">{{ to.addText }}</button>
    </div>
  `,
  styleUrls: ['./repeat-section.type.sass']
})
export class RepeatTypeComponent extends FieldArrayType {}
