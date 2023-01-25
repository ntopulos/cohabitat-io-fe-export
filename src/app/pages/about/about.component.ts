import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
  host: {
    class: 'content-medium'
  }
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
