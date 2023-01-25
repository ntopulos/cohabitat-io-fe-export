import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  public type: string;
  public notifications: any;

  @Input() notification: string;

  @Input() set dangers(dangers) {
    this.type = 'danger';
    this.notifications = dangers;
  }
  @Input() set danger(danger) {
    this.type = 'danger';
    this.notification = danger;
  }
  @Input() set successes(successes) {
    this.type = 'success';
    this.notifications = successes;
  }
  @Input() set success(success) {
    this.type = 'success';
    this.notification = success;
  }

  constructor() { }

  ngOnInit() {
  }

}
