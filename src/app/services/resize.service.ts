import { Injectable } from '@angular/core';
import { Observable, fromEvent, of, merge } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  resizeEvent$ = fromEvent(window, 'resize');
  loadEvent$ = fromEvent(window, 'load');

  resize(): Observable<Event> {
    // return this.resizeEvent$;
    return merge(
      this.resizeEvent$,
      this.loadEvent$
    );
  }

  getWidth(): Observable<any> {
    return this.resize()
    .pipe(
      map(result => {
        return result.target['innerWidth'];
      }),
      startWith(window.innerWidth)
    );
  }

  isMobile(smallerThan:number): Observable<any> {
    return this.getWidth()
    .pipe(
      filter(res => res !== undefined),
      map(width => {
        if (width) {
          return width <= smallerThan;
        }
      }),
      distinctUntilChanged()
    );
  }
}
