import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

@Injectable()
export class RequestCacheService {
  private cache = new Map<string, [Date, HttpResponse<any>]>();

  constructor() {
    this.loadStorageCache();
  }

  get(key): HttpResponse<any> {
    const tuple = this.cache.get(key);
    if (!tuple) return null;

    const expires = tuple[0];
    const httpResponse = tuple[1];

    // Don't observe expired keys
    const now = new Date();
    if (expires && expires.getTime() < now.getTime()) {
      this.loadStorageCache();
      this.cache.delete(key);
      this.saveStorageCache();
      return null;
    }

    return httpResponse;
  }

  set(key, value, ttl = null) {
    this.loadStorageCache();
    if (ttl) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + ttl);
      this.cache.set(key, [expires, value]);
    } else {
      this.cache.set(key, [null, value]);
    }
    this.saveStorageCache();
  }

  clear() {
    this.cache.clear();
    this.saveStorageCache();
  }

  private loadStorageCache() {
    var storageCache = JSON.parse(localStorage.getItem('cache'));
    if(storageCache) {
      storageCache.map((x => {
        this.cache.set(x[0], [new Date(x[1][0]), Object.setPrototypeOf(x[1][1], HttpResponse.prototype)]);
      }));
    }
  }

  private saveStorageCache() {
    localStorage.setItem(
      'cache',
      JSON.stringify(Array.from(this.cache.entries()))
    );
  }
}
