import { Injectable } from "@angular/core";
import { HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpInterceptor} from "@angular/common/http";
import { RequestCacheService } from '../services/requestCache.service';
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private ttl = 60 * 60 ;

  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method == 'GET' && !req.url.includes('/comments') && !req.url.includes('?search')) {
      const cachedResponse = this.cache.get(req.url);
      return cachedResponse
        ? of(cachedResponse)
        : this.sendRequest(req, next);
    } else {
      if (['POST', 'PUT', 'PUSH', 'PATCH', 'DELETE'].includes(req.method)) {
        this.cache.clear();
      }
      return this.sendRequest(req, next);
    }
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && req.method == 'GET'
        && !req.url.includes('/comments')) {
          this.cache.set(req.url, event, this.ttl);
        }
      })
    );
  }
}
