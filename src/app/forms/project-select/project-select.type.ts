import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { FieldType } from '@ngx-formly/core';
import { from, ReplaySubject, Subject } from 'rxjs';
import { takeUntil, filter, debounceTime, tap, flatMap, find } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'formly-field-project-select',
  template: `
  <mat-form-field>
    <mat-select
    [formControl]="formControl"
    placeholder="{{placeholder}}"
    required="true">
      <mat-option>
        <ngx-mat-select-search
        [formControl]="searchCtrl"
        placeholderLabel="Project name..."
        noEntriesFoundLabel="No match"
        [searching]="searching"></ngx-mat-select-search>
        </mat-option>
      <mat-option *ngFor="let project of serverSideResults | async" [value]="project.id" (click)="placeholder='Project'">
        {{project.attributes.name}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  `,
})
export class FormlyFieldProjectSelect extends FieldType implements OnDestroy {
  constructor(
    private projectService: ProjectService
  ) {
    super();
  }

  public placeholder = 'Project'

  /** control for the MatSelect filter keyword */
  public searchCtrl: FormControl = new FormControl();

  /** indicate search operation is in progress */
  public searching = false;

  /** list of banks filtered by search keyword */
  public serverSideResults: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);

  // @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  onDestroy$ = new Subject<void>();
  search$ = new EventEmitter();
  options$;

  ngOnInit() {
    if(this.formControl.value !== null && this.to.included) {
      var res = from(this.to.included).pipe(
        filter(o => o['type'] === 'projects'),
        find(p => p['id'] === this.formControl.value)
      );
      res.subscribe(project => this.placeholder = project['attributes']['name'])
    }

    this.searchCtrl.valueChanges.pipe(
      filter(search => search.length > 1),
      tap(() => this.searching = true),
      takeUntil(this._onDestroy),
      debounceTime(200),
      flatMap(s => {return this.projectService.searchProjects(s)}),
      takeUntil(this._onDestroy),
    ).subscribe(searchResults => {
      this.searching = false;
      this.serverSideResults.next(searchResults['data']);
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
