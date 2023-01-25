import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster'

import { MarkdownModule } from 'ngx-markdown';

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeagoModule } from 'ngx-timeago';

// Initialize
import { InitializeAppService } from './services/initialize-app.service'

export function initializeApp(appConfigService: InitializeAppService) {
  return () => appConfigService.init();
}

// Interceptors
import { ApiInterceptor } from './interceptors/api.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

// Cache
import { RequestCacheService } from './services/requestCache.service';
import { CacheInterceptor } from './interceptors/cache.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Translation */
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader} from 'localize-router';
import {RouterModule, ExtraOptions} from '@angular/router';
import {routes} from './app-routing.module';
import {Location} from '@angular/common';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  anchorScrolling: 'enabled'
};

/* Material */
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatAutocompleteModule,
} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxFileDropModule } from 'ngx-file-drop';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";

import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProjectLinksComponent } from './components/project-links/project-links.component';
import { ProjectTagsComponent } from './components/project-tags/project-tags.component';
import { ProjectPropertiesComponent } from './components/project-properties/project-properties.component';
import { ObjectImageComponent } from './components/object-image/object-image.component';
import { ObjectImagesComponent } from './components/object-images/object-images.component';
import { ObjectsImageComponent } from './components/objects-image/objects-image.component';
import { ObjectTextShortComponent } from './components/object-text-short/object-text-short.component';
import { ObjectTextLongComponent } from './components/object-text-long/object-text-long.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsItemComponent } from './pages/projects/item/projects-item.component';
import { AboutComponent } from './pages/about/about.component';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AccountActivateComponent } from './pages/account-activate/account-activate.component';
import { ProjectsCreateComponent } from './pages/projects/create/projects-create.component';
import { ButtonSpinnerComponent } from './components/button-spinner/button-spinner.component';
import { ProjectsItemRevisionsComponent } from './pages/projects/item/revisions/projects-item-revisions.component';
import { AccountPasswordResetComponent } from './pages/account-password-reset/account-password-reset.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsItemEditComponent } from './pages/projects/item/edit/projects-item-edit.component';
import { ProjectsItemEditBasicsComponent } from './pages/projects/item/edit/projects-item-edit-basics/projects-item-edit-basics.component';
import { ProjectsItemEditImagesComponent } from './pages/projects/item/edit/projects-item-edit-images/projects-item-edit-images.component';
import { ProjectsItemEditTextsComponent } from './pages/projects/item/edit/projects-item-edit-texts/projects-item-edit-texts.component';
import { ProjectsItemEditNetlinksComponent } from './pages/projects/item/edit/projects-item-edit-netlinks/projects-item-edit-netlinks.component';
import { ProjectsItemEditPropertiesComponent } from './pages/projects/item/edit/projects-item-edit-properties/projects-item-edit-properties.component';
import { ObjectVideosComponent } from './components/object-videos/object-videos.component';
import { SafePipe } from './helpers/safe.pipe';
import { ReplacePipe } from './helpers/replace.pipe';
import { FilterProjectsPipe } from './helpers/filter-projects.pipe';
import { ProjectsItemEditVideosComponent } from './pages/projects/item/edit/projects-item-edit-videos/projects-item-edit-videos.component';
import { ProjectsItemEditImagesDDialogComponent } from './pages/projects/item/edit/projects-item-edit-images/projects-item-edit-images-d-dialog/projects-item-edit-images-d-dialog.component';
import { ProjectsItemEditImagesMDialogComponent } from './pages/projects/item/edit/projects-item-edit-images/projects-item-edit-images-m-dialog/projects-item-edit-images-m-dialog.component';
import { ProjectsItemEditImagesUDialogComponent } from './pages/projects/item/edit/projects-item-edit-images/projects-item-edit-images-u-dialog/projects-item-edit-images-u-dialog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ObjectAddressComponent } from './components/object-address/object-address.component';
import { ObjectStatusComponent } from './components/object-status/object-status.component';
import { ProjectsItemMetaComponent } from './pages/projects/item/meta/projects-item-meta.component';
import { ProjectsItemRevisionsItemComponent } from './pages/projects/item/revisions/projects-item-revisions-item/projects-item-revisions-item.component';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyFieldProjectSelect } from './forms/project-select/project-select.type';
import { FormlyFieldAddressSearch } from './forms/address-search/address-search.type';
import { RepeatTypeComponent } from './forms/repeat-section/repeat-section.type';
import { ProjectsItemEditMetaComponent } from './pages/projects/edit-meta/projects-item-edit-meta.component';
import { LoginMetaComponent } from './components/login-meta/login-meta.component';
import { LegalTosComponent } from './pages/legal/legal-tos/legal-tos.component';
import { LegalPrivacyComponent } from './pages/legal/legal-privacy/legal-privacy.component';
import { PendingChangesGuard } from './helpers/pending-changes.guard';
import { PartnersComponent } from './pages/partners/partners.component';
import { PartnersItemComponent } from './pages/partners/item/partners-item.component';
import { PartnersItemMetaComponent } from './pages/partners/item/meta/partners-item-meta.component';
import { PartnersCreateComponent } from './pages/partners/create/partners-create.component';
import { PartnersItemEditMetaComponent } from './pages/partners/edit-meta/partners-item-edit-meta.component';
import { PartnersItemEditBasicsComponent } from './pages/partners/item/edit/projects-item-edit-basics/partners-item-edit-basics.component';
import { PartnersItemEditComponent } from './pages/partners/item/edit/partners-item-edit.component';
import { PartnersItemEditNetlinksComponent } from './pages/partners/item/edit/projects-item-edit-netlinks/partners-item-edit-netlinks.component';
import { PartnersItemEditTextsComponent } from './pages/partners/item/edit/projects-item-edit-texts/partners-item-edit-texts.component';
import { PartnersItemEditVideosComponent } from './pages/partners/item/edit/projects-item-edit-videos/partners-item-edit-videos.component';
import { PartnersItemRevisionsComponent } from './pages/partners/item/revisions/partners-item-revisions.component';
import { PartnersItemRevisionsItemComponent } from './pages/partners/item/revisions/item/partners-item-revisions-item.component';
import { CommunityComponent } from './pages/community/community.component';
import { PartnersItemEditPartnershipsComponent } from './pages/partners/item/edit/partners-item-edit-partnerships/partners-item-edit-partnerships.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PartnerPartnershipsComponent } from './components/partner-partnerships/partner-partnerships.component';
import { ObjectLocationComponent } from './components/object-location/object-location.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TruncatePipe } from './helpers/truncate.pipe';
import { ObjectDrawerComponent } from './components/object-drawer/object-drawer.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,

    SafePipe,
    ReplacePipe,
    FilterProjectsPipe,
    TruncatePipe,

    RepeatTypeComponent,
    FormlyFieldProjectSelect,
    FormlyFieldAddressSearch,

    HomeComponent,
    ProjectsComponent,
    PartnersComponent,
    PartnersItemComponent,
    ProjectsItemComponent,
    AboutComponent,
    PageNotFoundComponent,
    ProjectLinksComponent,
    ProjectTagsComponent,
    ProjectPropertiesComponent,
    ObjectImageComponent,
    ObjectImagesComponent,
    ObjectsImageComponent,
    ObjectTextShortComponent,
    ObjectTextLongComponent,
    MyAccountComponent,
    LoginDialogComponent,
    RegisterComponent,
    NotificationComponent,
    AccountActivateComponent,
    ProjectsCreateComponent,
    PartnersCreateComponent,
    ButtonSpinnerComponent,
    PartnersItemRevisionsComponent,
    ProjectsItemRevisionsComponent,
    ProjectsItemEditBasicsComponent,
    PartnersItemEditBasicsComponent,
    AccountPasswordResetComponent,
    LoginComponent,
    ProjectsItemEditComponent,
    PartnersItemEditComponent,
    ProjectsItemEditImagesComponent,
    PartnersItemEditTextsComponent,
    ProjectsItemEditTextsComponent,
    PartnersItemEditNetlinksComponent,
    ProjectsItemEditNetlinksComponent,
    ProjectsItemEditPropertiesComponent,
    ObjectVideosComponent,
    PartnersItemEditVideosComponent,
    ProjectsItemEditVideosComponent,
    ProjectsItemEditImagesDDialogComponent,
    ProjectsItemEditImagesMDialogComponent,
    ProjectsItemEditImagesUDialogComponent,
    CommentsComponent,
    ObjectAddressComponent,
    ObjectStatusComponent,
    ProjectsItemMetaComponent,
    PartnersItemMetaComponent,
    PartnersItemRevisionsItemComponent,
    ProjectsItemRevisionsItemComponent,
    NotificationSnackbarComponent,
    ProjectsItemEditMetaComponent,
    PartnersItemEditMetaComponent,
    LoginMetaComponent,
    LegalTosComponent,
    LegalPrivacyComponent,
    CommunityComponent,
    PartnersItemEditPartnershipsComponent,
    PartnerPartnershipsComponent,
    ObjectLocationComponent,
    ObjectDrawerComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    ProjectsItemEditImagesDDialogComponent,
    ProjectsItemEditImagesMDialogComponent,
    ProjectsItemEditImagesUDialogComponent,
    NotificationSnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    LeafletModule,
    LeafletMarkerClusterModule,

    MarkdownModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings) =>
          new ManualParserLoader(translate, location, settings, ['en','es', 'fr'], 'ROUTES'),
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    RouterModule.forRoot(routes, routingConfiguration),
    NgxFileDropModule,
    TimeagoModule.forRoot(),

    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatAutocompleteModule,

    NgxMatSelectSearchModule,

    DragDropModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'project-select', component: FormlyFieldProjectSelect },
        { name: 'address-search', component: FormlyFieldAddressSearch },
      ],
    }),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    Title,
    RequestCacheService,
    PendingChangesGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitializeAppService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
