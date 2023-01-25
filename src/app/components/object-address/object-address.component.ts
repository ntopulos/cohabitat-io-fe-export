import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-object-address',
  templateUrl: './object-address.component.html',
  styleUrls: ['./object-address.component.sass']
})
export class ObjectAddressComponent implements OnInit {

  @Input() addressFormatted: any;

  constructor() { }

  ngOnInit() {
  }

}
