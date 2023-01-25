import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  host: {
    class: 'content-large'
  }
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }
}
