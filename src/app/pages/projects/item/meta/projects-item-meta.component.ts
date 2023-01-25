import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { latLng, tileLayer,Layer, marker, icon } from 'leaflet';
import * as L from 'leaflet';

import { Project } from 'src/app/models/project/project.model';
import { Included } from 'src/app/models/included.model';
import { take } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-projects-item-meta',
  templateUrl: './projects-item-meta.component.html',
  styleUrls: ['./projects-item-meta.component.sass'],
  host: {
    class: 'content-medium'
  }
})
export class ProjectsItemMetaComponent implements OnInit {

  public project: Project;
  public included: Included;
  public projectFiles;
  public currentLang: any;
  public commentsTotalCount: number = 0;
  public imagesCount: number = 0;
  public map;
  public isRevision: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
  ) {}

  @Input()
  set routerData(data: any) {

    // Project or revision
    if (data.projectMeta) {
      // Project
      this.project = data.projectMeta.project;
      this.included = data.projectMeta.included;
    } else {
      // Revision
      this.isRevision = true;

      // Convert Revision to Project (dirty trick)
      // TODO - change API object-revision relation & structure
      let project = data.projectRevisionMeta.data;
      project.type = 'projects';
      Object.assign(project.attributes, project.attributes.basics);
      delete project.attributes.basics;
      this.project = project;

      this.route.params.pipe(take(1)).subscribe(params => {
        project.id = params['id'];
      });

      this.included = data.projectRevisionMeta.included
    }

    this.addMarker(this.project.attributes.coordinates.lat, this.project.attributes.coordinates.lng);
    this.options.center = latLng(this.project.attributes.coordinates.lat, this.project.attributes.coordinates.lng);

    this.projectFiles = data.projectFilesMeta;

    // Images count
    if (data.projectFilesMeta && data.projectFilesMeta.included) {
      let images = data.projectFilesMeta.included.filter(x => x.type === 'files');
      if (images) {
        this.imagesCount = images.length;
      }
    }
  }

  ngOnInit() {
  }

  public tabIndex = 0;
  public gotToComments() {
      this.viewportScroller.scrollToAnchor('object-tabs');
      this.tabIndex = 5;
  }
  public gotToMap() {
      this.viewportScroller.scrollToAnchor('object-tabs');
      this.tabIndex = 3;
  }

  // Refresh map on tab focus
  // https://github.com/Asymmetrik/ngx-leaflet/issues/223#issuecomment-496237234
  public onTabChanged(event) {
    if (event.index == 3) {
      this.map.invalidateSize();
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  setCommentsTotalCount(total) {
    this.commentsTotalCount = total;
  }

  // Map
  onMapReady(map: L.Map) {
    this.map = map;
    map.addControl(L.control.zoom({ position: 'topright' }));
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(46.879966 , -121.726909),
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false
  };

  markers: Layer[] = [];

	addMarker(lat, lng) {
		const newMarker = marker(
			[lat, lng],
			{
				icon: icon({
					iconSize: [26, 41],
					iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
				})
			}
		);

		this.markers.push(newMarker);
	}
}
