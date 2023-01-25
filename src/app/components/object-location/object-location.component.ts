import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, tileLayer,Layer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-object-location',
  templateUrl: './object-location.component.html',
  styleUrls: ['./object-location.component.sass']
})
export class ObjectLocationComponent implements OnInit {

  public addressForm = new FormGroup({});
  public addressFormFields: FormlyFieldConfig[] = [
    {
      key: 'address',
      fieldGroup: [{
        key: 'geocode',
        type: 'address-search',
        templateOptions: {
          onAddressSelected: (coordinates) => this.moveMap(coordinates)
        }
      }]
    }
  ];
  private map;

  @Input() formValues: any;
  @Input() object: any;
  @Output() mapMoved = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    if (this.object) {
      setTimeout( () => {
        // Put marker on map
        this.addMarker(this.object.attributes.coordinates.lat, this.object.attributes.coordinates.lng);
        this.options.center = latLng(this.object.attributes.coordinates.lat, this.object.attributes.coordinates.lng);
        this.map.panTo(latLng(this.object.attributes.coordinates.lat,this.object.attributes.coordinates.lng));
      }, 1 );
    }
  }

  // Map
  moveMap(coordinates) {
    this.map.panTo(latLng(coordinates.lat, coordinates.lng));
  }

  onMapReady(map: L.Map) {
    this.map = map;
    map.addControl(L.control.zoom({ position: 'topright' }));
  }

  onMapMoveEnd() {
    // Update form
    if (this.map.getCenter().lat !== this.formValues.basics.coordinates.latitude &&
    this.map.getCenter().lng !== this.formValues.basics.coordinates.longitude) {
      this.mapMoved.emit(true);
    }

    this.formValues.basics.coordinates.latitude = this.map.getCenter().lat;
    this.formValues.basics.coordinates.longitude = this.map.getCenter().lng;

    // Update marker
		this.markers.pop();
    this.addMarker(this.map.getCenter().lat,this.map.getCenter().lng);
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '...' })
    ],
    zoom: 16,
    center: latLng(46.95,7.45),
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
