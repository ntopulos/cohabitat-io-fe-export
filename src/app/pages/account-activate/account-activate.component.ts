import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.sass'],
  host: {
    class: 'content-small'
  }
})
export class AccountActivateComponent implements OnInit {

  public error;
  public success;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');

    this.authenticationService.activate(token)
      .subscribe(
        data => {
          this.success = "The account has been activated.";
        },
        error => {
          console.log(error)
          this.error = "The account activation failed.";
        });
  }
}
