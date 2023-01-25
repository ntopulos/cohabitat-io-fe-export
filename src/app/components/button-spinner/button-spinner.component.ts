import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-spinner',
  templateUrl: './button-spinner.component.html',
  styleUrls: ['./button-spinner.component.sass']
})
export class ButtonSpinnerComponent implements OnInit {

  @Input() public title: string;
  @Input() public style: string;
  @Input() public color: string = 'primary';
  @Input() public spinning: boolean = false;
  @Input() public disabled: boolean = false;


  constructor() {
  }

  ngOnInit() {
  }

}
