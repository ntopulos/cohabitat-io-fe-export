import { Injectable } from '@angular/core';
import { version } from '../../../package.json';

export class AppComponent {
  public version: string = version;
}

@Injectable({
  providedIn: 'root'
})
export class InitializeAppService {

  constructor() {
    this.initStorage();
   }

  init() { }

  private initStorage() {
    // If the storage was created in a previous app version, cache is cleared
    var storageAppVersion = localStorage.getItem('app-version');
    if(!(storageAppVersion && storageAppVersion == version)) {
      console.log('Clearing old version\'s cache.');
      localStorage.removeItem('cache');
      localStorage.setItem('app-version',version);
    }
  }
}
