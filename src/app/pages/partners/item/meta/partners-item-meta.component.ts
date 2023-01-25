import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { latLng, tileLayer,Layer, marker, icon } from 'leaflet';
import * as L from 'leaflet';

import { Included } from 'src/app/models/included.model';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { Partner } from 'src/app/models/partner/partner.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-partners-item-meta',
  templateUrl: './partners-item-meta.component.html',
  styleUrls: ['./partners-item-meta.component.sass'],
  host: {
    class: 'content-medium'
  }
})
export class PartnersItemMetaComponent implements OnInit {

  public partner: Partner;
  public included: Included;
  public partnerFiles;
  public currentLang: any;
  public commentsTotalCount: number = 0;
  public imagesCount: number = 0;
  public map;
  public isRevision: boolean = false;

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
  ) {}

  @Input()
  set routerData(data: any) {
    // Partner or revision
    if (data.partnerMeta) {
      // Partner
      this.partner = data.partnerMeta.partner;
      this.included = data.partnerMeta.included;
    } else {
      // Revision
      this.isRevision = true;
      console.log(data)
      // Convert Revision to Partner (dirty trick)
      // TODO - change API object-revision relation & structure
      let partner = data.partnerRevisionMeta.data;
      partner.type = 'partners';
      Object.assign(partner.attributes, partner.attributes.basics);
      delete partner.attributes.basics;
      this.partner = partner;

      this.route.params.pipe(take(1)).subscribe(params => {
        partner.id = params['id'];
      });

      this.included = data.partnerRevisionMeta.included
    }

    this.addMarker(this.partner.attributes.coordinates.lat, this.partner.attributes.coordinates.lng);
    this.options.center = latLng(this.partner.attributes.coordinates.lat, this.partner.attributes.coordinates.lng);

    this.partnerFiles = data.partnerFilesMeta;

    // Images count
    if (data.partnerFilesMeta && data.partnerFilesMeta.included) {
      let images = data.partnerFilesMeta.included.filter(x => x.type === 'files');
      if (images) {
        this.imagesCount = images.length;
      }
    }
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
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
      this.map.invalidateSize()
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
