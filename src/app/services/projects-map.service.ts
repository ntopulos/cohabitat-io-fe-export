import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsMapService {

  public position: {
    lat: number,
    lng: number,
    zoom: number,
  };

  constructor() { }
}
