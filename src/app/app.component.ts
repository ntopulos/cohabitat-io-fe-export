import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, take } from 'rxjs/operators';
import { NotificationService } from './services/notification.service';
import { MatSnackBar } from '@angular/material';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { GoogleAnalyticsService } from './google-analytics.service';
import { version as AppVersion } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title: string = 'CoHabitat.io';
  pageLoading: boolean = true;
  appVersion: string;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private titleService: Title,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
  ) {
    this.appVersion = AppVersion;

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // Loading status when loading a page (resolvers)
    router.events.subscribe((routerEvent: RouterEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.pageLoading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.pageLoading = false;
      }
    });

    // Notfication service
    this.notificationService.notification$.subscribe(input => {
      this.snackBar.openFromComponent(
        NotificationSnackbarComponent,
        {
          data: input.content,
          duration: 5000,
          panelClass: input.type+"-snackbar"
        }
      );
    });
  }

  ngOnInit() {
    this.googleAnalyticsService.init();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.router))
      .subscribe((event) => {
          const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
          this.setTitle(title);
        }
      );
  }

  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  public setTitle(pageTitle: string | null) {
    if (pageTitle) {
      this.translate.get(pageTitle)
      .pipe(take(1))
      .subscribe(
        translation => {
          this.titleService.setTitle(translation + ' - ' + this.title);
        });
    } else {
      this.titleService.setTitle(this.title);
    }
  }
}
