import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  host: {
    class: 'content-small'
  }
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.authenticationService.currentUser) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToGoal() {
    this.router.navigate([this.returnUrl]);
  }
}
