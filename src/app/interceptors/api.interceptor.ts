import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpInterceptor} from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private translate: TranslateService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // Setting up language
    let lang = 'en';
    if (this.translate.currentLang) {
      lang = this.translate.currentLang
    }

    request = request.clone({
        setHeaders: {
          // 'Content-Type': 'application/json ',
          // 'Content-Type': 'multipart/form-data',
          'Accept': 'application/vnd.cohabitat.v1+json',
          'Accept-Language': lang,
        }
    });

    return next.handle(request);
  }

}
