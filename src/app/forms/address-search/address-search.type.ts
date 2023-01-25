import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { from, ReplaySubject, Subject } from 'rxjs';
import { takeUntil, filter, debounceTime, tap, flatMap, find } from 'rxjs/operators';
import { GeocodeService } from 'src/app/services/geocode.service';


@Component({
  selector: 'formly-field-address-search',
  templateUrl: './address-search.type.html'
})
export class FormlyFieldAddressSearch extends FieldType implements OnDestroy {
  constructor(
    private geocodeService: GeocodeService
  ) {
    super();
  }

  public placeholder = 'Address'

  /** control for the MatSelect filter keyword */
  public searchCtrl: FormControl = new FormControl();

  /** indicate search operation is in progress */
  public searching = false;

  /** list of banks filtered by search keyword */
  public serverSideResults: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  onDestroy$ = new Subject<void>();
  search$ = new EventEmitter();
  options$;

  @Output() onAddressSelected: EventEmitter<any> = new EventEmitter<any>();

  public selectAddress(coordinates: any): void {
    this.field.templateOptions.onAddressSelected(coordinates);
  }

  ngOnInit() {
    if(this.formControl.value !== null && this.to.included) {
      var res = from(this.to.included);
      res.subscribe(address => this.placeholder = address['formatted_address']);
    }

    this.searchCtrl.valueChanges.pipe(
      filter(search => search.length > 1),
      tap(() => this.searching = true),
      takeUntil(this._onDestroy),
      debounceTime(600),
      flatMap(s => {return this.geocodeService.geocodeAddress(s)}),
      takeUntil(this._onDestroy),
    ).subscribe(searchResults => {
      this.searching = false;
      this.serverSideResults.next([searchResults['result']]);
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
