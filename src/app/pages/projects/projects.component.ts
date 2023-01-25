import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as L from 'leaflet';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsMapService } from 'src/app/services/projects-map.service';
import { Project } from 'src/app/models/project/project.model';
import { Included } from 'src/app/models/included.model';
import { Subscription } from "rxjs";
import { ResizeService } from 'src/app/services/resize.service';
import { ObjectDrawerComponent } from 'src/app/components/object-drawer/object-drawer.component';
import { ProjectService } from 'src/app/services/project.service';
import { TagsHelper } from 'src/app/helpers/tags.helper';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectTagsForm } from 'src/app/forms/project-tags.form';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {

  public projects: Project[]|null = null;
  public filteredProjects: Project[]|null = null;
  public included: Included;
  public currentLang: any;
  public isMobile:boolean = true;
  public projectInDrawer: Project|null;
  public loading = false;
  resizeSubscription1$: Subscription;
  resizeSubscription2$: Subscription;
  routeDataSubscription$: Subscription;
  routeParamsSubscription$: Subscription;
  filterDataSubscription$: Subscription;

  outlinedProjectId: string | null;

  private initialfilterTagsLoad = true;
  public filterTagsForm = new FormGroup({});
  public filterTagsFormValues = {};
  public filterTagsFormFields: FormlyFieldConfig[] = [];
  public allTags;

  mapSync = false;
  listLimit = 20;
  public isMapOn: boolean = true;
  public map: L.Map;
  public filterName;
  private mapPreviousPosition: {
    lat: number,
    lng: number,
    zoom: number
  };
  private filterTagsPreviousValue: string = '';

  @ViewChild(ObjectDrawerComponent, {static: false}) drawer: ObjectDrawerComponent;
  @ViewChild('tagsFiltersTrigger', {static: false}) tagsFiltersTrigger: MatMenuTrigger;

  constructor(
    private zone: NgZone,
    private router: Router,
    private localize: LocalizeRouterService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private projectService: ProjectService,
    private projectsMapService: ProjectsMapService,
    private resizeService: ResizeService,
    private tagsHelper: TagsHelper,
    private projectTagsForm: ProjectTagsForm,
    ) { }

  ngOnInit() {
    // refresh the map to avoid display bugs when resizing (some persist but it helps)
    this.resizeSubscription1$ = this.resizeService.resize().subscribe(r => this.map.invalidateSize());

    this.resizeSubscription2$ = this.resizeService.getWidth().subscribe(width => {
      if (width) {
        if (width < 1000) {
          this.isMobile = true;
          // this.isMapOn = false;
        } else {
          this.isMobile = false;
          this.mapSync = true;
        }
      }
    });

    this.routeDataSubscription$ = this.route.data.subscribe(data => {
      this.projects = data.projectsMeta.data;
      this.included = data.projectsMeta.included;
      this.projects.forEach(project => {
        this.addMarker(project, null);
      });
      this.markerClusterData = this.markers;
      this.setFilteredProjects();

      // Tag filter
      this.allTags = this.tagsHelper.getAllGroupsWithTags(data.tagsgroupsMeta);
      let tagsForm = this.projectTagsForm.getTagsForm(this.allTags, 'filter');
      this.filterTagsFormFields.push(tagsForm);
    });

    // Read query parmaters to set previous map position & tags
    this.routeParamsSubscription$ = this.route.queryParams.subscribe(p => {

      // Position
      if (!this.mapPreviousPosition) {
        if (p['lat'] && p['lng'] && p['z']) {
          this.mapPreviousPosition = {
            lat: Number(p['lat']),
            lng: Number(p['lng']),
            zoom: Number(p['z'])
          };
        } else if (this.projectsMapService.position) {
          this.mapPreviousPosition = this.projectsMapService.position;
        }
      }
      // TODO Move map on history back without infinite loop

      // Tags
      if (p['tags']) {
        if (p['tags'] !== this.filterTagsPreviousValue) {
          this.filterByTags(p['tags']);
          this.filterTagsPreviousValue = p['tags'];

          if (this.initialfilterTagsLoad) {
            this.populateFilterTagsForm(p['tags']);
          }
        }
      } else {
        if (this.filterTagsPreviousValue !== '') {
          this.filterByTags('');
        }
        this.filterTagsPreviousValue = '';
      }
      this.initialfilterTagsLoad = false;
    });

    this.currentLang = this.translate.currentLang;
  }

  ngOnDestroy() {
    this.resizeSubscription1$.unsubscribe();
    this.resizeSubscription2$.unsubscribe();
    this.routeDataSubscription$.unsubscribe();
    this.routeParamsSubscription$.unsubscribe();
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  // Map
  onMapReady(map: L.Map) {
    this.map = map;
    map.addControl(L.control.zoom({ position: 'topright' }));

    if (this.mapPreviousPosition) {
      this.map.setView(new L.LatLng(
          this.mapPreviousPosition.lat,
          this.mapPreviousPosition.lng
        ),
        this.mapPreviousPosition.zoom
      );
    } else {
      this.onMapMoveEnd();
    }
  }

  mapToggled() {
    if (this.isMapOn) {
      this.map.invalidateSize();
    }
  }

  onMapMoveEnd() {

    if (this.mapSync) {
      this.setFilteredProjects();
    }

    // Save position to service
    this.projectsMapService.position = {
      lat: this.map.getCenter().lat,
      lng: this.map.getCenter().lng,
      zoom: this.map.getZoom(),
    }

    // Write position to router
    const queryParams: Params = {
      z: this.map.getZoom(),
      lat: this.map.getCenter().lat,
      lng: this.map.getCenter().lng,
    };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  setFilteredProjects() {
    if (this.map) {
      this.filteredProjects = this.projects.filter(x => {
        return x.attributes.coordinates.lat >= this.map.getBounds().getSouthWest().lat &&
        x.attributes.coordinates.lat <= this.map.getBounds().getNorthEast().lat &&
        x.attributes.coordinates.lng >= this.map.getBounds().getSouthWest().lng &&
        x.attributes.coordinates.lng <= this.map.getBounds().getNorthEast().lng;
      });
    }
  }



  // Open Street Map Definition

	layersControlOptions = { position: 'bottomright' };

  LAYER_OSM = {
		id: 'voyager',
		name: 'voyager',
		layer: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
      attribution: '...'
    }),
  };

  // Works only on localhost
  // LAYER_WM = {
	// 	id: 'wikimedia',
	// 	name: 'wikimedia',
	// 	layer: L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
  //     minZoom: 1,
  //     maxZoom: 19,
  //     attribution: '...'
  //   }),
  // };

  LAYER_OSM2 = {
		id: 'terrain',
		name: 'Black&White', // Stamen.TonerLite
		layer: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 18,
      attribution: '...'
    }),
  };

  baseLayers = {
		'Default': this.LAYER_OSM.layer,
		'Terrain': this.LAYER_OSM2.layer
	};

  options = {
    zoom: 5,
    center: L.latLng(48, 5),
    zoomControl: false,
    scrollWheelZoom: true,
    attributionControl: false
  };

	// Marker cluster stuff
	markerClusterGroup: L.MarkerClusterGroup;
	markerClusterData: L.Marker[] = [];
	markerClusterOptions: L.MarkerClusterGroupOptions = {
    showCoverageOnHover: false
  };
  markers: L.Marker[] = [];

	markerClusterReady(group: L.MarkerClusterGroup) {
		this.markerClusterGroup = group;
	}

	addMarker(project: Project, focusProjectId: string|null) {

    let svg = `<?xml version="1.0" encoding="UTF-8"?>
      <svg viewBox="0 0 365 560" class="marker">
        <path d="m182.9 551.7c0 0.1 0.2 0.3 0.2 0.3s175.2-269 175.2-357.4c0-130.1-88.8-186.7-175.4-186.9-86.6 0.2-175.4 56.8-175.4 186.9 0 88.4 175.3 357.4 175.3 357.4z"/>
        <ellipse cx="182.9" cy="175.28" rx="68.901" ry="71.389" fill="#fff" fill-rule="evenodd" stroke-width=".89547"/>
      </svg>`;

    // Outline project on map
    let projectClassName = null;
    if (project.id === focusProjectId) {
      projectClassName = 'focus';
    }

		const newMarker = L.marker(
      [
        project.attributes.coordinates.lat,
        project.attributes.coordinates.lng
      ],
			{
				icon: L.divIcon({
          iconSize: [26, 41],
          iconAnchor: [13, 41],
          html: svg,
          className: projectClassName,
        })
			}
    )
    .on('click', _e => {
      this.zone.run(() => {
        if (!this.isMobile) {
          let translatedPath: any = this.localize.translateRoute('/projects/'+project.id);
          this.router.navigateByUrl(translatedPath);
        } else {
          this.projectInDrawer = null;
          this.drawer.open();
          this.projectInDrawer = project;
        }
      });
    })
    .on('mouseover', _e => {
      this.zone.run(() => {
        this.outlinedProjectId = project.id;
        this.scrollToElementProject(project.id);
      });
    })
    .on('mouseout', _e => {
      this.zone.run(() => {
        this.outlinedProjectId = null;
      });
    });
    this.markers.push(newMarker);
  }

  scrollToElementProject(projectId) {
    if (!this.isMobile) {
      // When list and map are not in sync, element does not exist
      try {
        document.getElementById('project-'+projectId).scrollIntoView();
      } catch (e) {}
    }
  }

  outlineProjectOnMap(projectId:string|null) {
    this.markers = [];
    this.projects.forEach(project => {
      this.addMarker(project, projectId);
    });
    this.markerClusterData = this.markers;
  }

  private populateFilterTagsForm(tagsString:string) {
    let tagsObject = {};
    let input = tagsString.split(';');

    input.forEach(ig => {
      let group = ig.match(/(\w+(?=\())/)[0];
      if (group) {
        let tags = ig.match(/(?<=\()(.+)(?=\))/)[0].split(',');
        if (tags) {
          tagsObject[group] = {};
          tags.forEach(tag => {
            tagsObject[group][tag] = true;
          })
        }
      }
    });

    this.filterTagsFormValues['tags'] = tagsObject;
  }

  submitTagsFilter() {
    // Format input
    let input = JSON.parse(JSON.stringify(this.filterTagsFormValues));
    let tagsQuery = this.formatTagsForUrl(input.tags);

    // Write position to router
    const queryParams: Params = {
      tags: tagsQuery
    };

    this.tagsFiltersTrigger.closeMenu();

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  filterByTags(query: string) {
    this.loading = true;
    this.filterDataSubscription$ = this.projectService.getProjectsFilterByTags(query)
    .subscribe(res => {
      this.projects = res['data'];
      this.included = res['included'];
      this.markers = [];
      this.projects.forEach(project => {
        this.addMarker(project, null);
      });
      this.markerClusterData = this.markers;
      this.setFilteredProjects();
    })
    .add(() => this.loading = false);
  }


  // Convert tags format to the format of the API input
  private formatTagsForUrl(inputTags)
  {
    var tags = '';
    for (var group in inputTags) {
      var groupTags = inputTags[group];
      if (this.notAllFalse(groupTags)) {
        tags = tags + group + '(';
        for (var slug in groupTags) {
          if (groupTags[slug]) {
            tags = tags + slug + ',';
          }
        }
        tags = tags.slice(0, -1);
        tags = tags + ');';
      }
    }
    tags = tags.slice(0, -1);
    if (tags === '') {
      return null;
    }
    return tags;
  }

  private notAllFalse(tags) {
    for (var slug in tags) {
      if (tags[slug]) {
        return true;
      }
    }
    return false;
  }

}
