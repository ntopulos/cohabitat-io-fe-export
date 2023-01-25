import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Partner } from 'src/app/models/partner/partner.model';
import { TruncatePipe } from 'src/app/helpers/truncate.pipe';
import { ResizeService } from 'src/app/services/resize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.sass'],
})


export class PartnersComponent implements OnInit {

  public currentLang: any;
  public displayedColumns: string[] = ['name', 'country'];
  public dataSource: MatTableDataSource<ItemData>;
  public filterName;
  public items;
  public itemsMobile;
  resizeSubscription$: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private zone: NgZone,
    private router: Router,
    private localize: LocalizeRouterService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private resizeService: ResizeService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      let partners:Partner[] = data.partnersMeta.data;
      this.items = partners.map(function(p) {
        return {
          id: p.id,
          name: new TruncatePipe().transform(p.attributes.name, [64]),
          name_short: p.attributes.name_short,
          country: p.attributes.country_code,
        }
      });
      this.itemsMobile = partners.map(function(p) {
        let name;
        if (p.attributes.name_short) {
          name = p.attributes.name_short;
        } else {
          name = new TruncatePipe().transform(p.attributes.name, [32]);
        }
        return {
          id: p.id,
          name: name,
          country: p.attributes.country_code,
        }
      });
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.sort = this.sort;

      // Sort ignoring case
      // https://github.com/angular/components/issues/9205#issuecomment-363728266
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
    });

    this.resizeSubscription$ = this.resizeService
      .isMobile(780)
      .subscribe(im => {
        if (im) {
          this.dataSource = new MatTableDataSource(this.itemsMobile);
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource(this.items);
          this.dataSource.sort = this.sort;
        }
      });

    this.currentLang = this.translate.currentLang;
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface ItemData {
  id: string;
  name: string;
  name_short: string;
  country: string;
}
