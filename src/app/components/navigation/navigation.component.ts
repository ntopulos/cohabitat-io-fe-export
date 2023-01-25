import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResizeService } from 'src/app/services/resize.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer: MatSidenav;

  public languages = [
    ['en', 'English'],
    ['es', 'Español'],
    ['fr', 'Français'],
  ];

  public isMobile: boolean;
  resizeSubscription$: Subscription;

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router,
    private resizeService: ResizeService,
    ) {
      router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe((event: NavigationStart) => {
        this.drawer.close()
      });
    }

  ngOnInit() {
    this.resizeSubscription$ = this.resizeService
      .isMobile(780)
      .subscribe(im => this.isMobile = im);
  }

  public changeLanguage(lang: string) {
    // This does not work as it should: https://github.com/Greentube/localize-router/pull/159
    // this.localize.changeLanguage(lang);
    // TODO Remove localize-router (need to recreate its init behavior)

    // Alternative manual method
    this.router.navigateByUrl('/' + lang + this.router.url.slice(3));
  }

  public openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '320px'
    });
  }

  public logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }
}
