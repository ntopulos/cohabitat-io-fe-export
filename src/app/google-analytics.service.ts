import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private router: Router) { }

  public event(eventName: string, params: {}) {
    gtag('event', eventName, params);
  }

  public init() {

    if (!environment.production) {
      console.log('Google Analytics will not be loaded, because the app is not in production mode.');
      return;
    }

    this.listenForRouteChanges();

    try {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.googleAnalyticsTrackingId;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '` + environment.googleAnalyticsTrackingId + `', {'send_page_view': false});
      `;
      document.head.appendChild(script2);
    } catch (e) {
      console.error('Error appending Google Analytics');
      console.error(e);
    }
  }

  private listenForRouteChanges() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsTrackingId, {
          'page_path': event.urlAfterRedirects,
        });
      }
    });
  }

}
