import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { PendingChangesGuard } from './helpers/pending-changes.guard';

import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsItemComponent } from './pages/projects/item/projects-item.component';
import { ProjectsItemRevisionsComponent } from './pages/projects/item/revisions/projects-item-revisions.component';
import { ProjectsItemEditComponent } from './pages/projects/item/edit/projects-item-edit.component';
import { ProjectsItemEditBasicsComponent } from './pages/projects/item/edit/projects-item-edit-basics/projects-item-edit-basics.component';
import { ProjectsItemEditPropertiesComponent } from './pages/projects/item/edit/projects-item-edit-properties/projects-item-edit-properties.component';
import { ProjectsItemEditNetlinksComponent } from './pages/projects/item/edit/projects-item-edit-netlinks/projects-item-edit-netlinks.component';
import { ProjectsItemEditTextsComponent } from './pages/projects/item/edit/projects-item-edit-texts/projects-item-edit-texts.component';
import { ProjectsItemEditVideosComponent } from './pages/projects/item/edit/projects-item-edit-videos/projects-item-edit-videos.component';
import { ProjectsItemEditImagesComponent } from './pages/projects/item/edit/projects-item-edit-images/projects-item-edit-images.component';
import { ProjectsCreateComponent } from './pages/projects/create/projects-create.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountActivateComponent } from './pages/account-activate/account-activate.component';
import { AccountPasswordResetComponent } from './pages/account-password-reset/account-password-reset.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

import { ProjectsResolverService } from './resolvers/projects.resolver';
import { ProjectResolverService } from './resolvers/project.resolver';
import { ProjectFilesResolverService } from './resolvers/project-files.resolver';
import { ProjectRevisionsResolverService } from './resolvers/project-revisions.resolver';
import { TagsgroupsResolverService } from './resolvers/tagsgroups.resolver';
import { ProjectPropertiesResolverService } from './resolvers/project-properties.resolver';
import { ProjectsItemRevisionsItemComponent } from './pages/projects/item/revisions/projects-item-revisions-item/projects-item-revisions-item.component';
import { ProjectRevisionResolverService } from './resolvers/project-revision.resolver.ts';
import { LegalTosComponent } from './pages/legal/legal-tos/legal-tos.component';
import { LegalPrivacyComponent } from './pages/legal/legal-privacy/legal-privacy.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { PartnersResolverService } from './resolvers/partners.resolver';
import { PartnersItemComponent } from './pages/partners/item/partners-item.component';
import { PartnerResolverService } from './resolvers/partner.resolver';
import { PartnerFilesResolverService } from './resolvers/partner-files.resolver';
import { PartnersCreateComponent } from './pages/partners/create/partners-create.component';
import { PartnersItemEditComponent } from './pages/partners/item/edit/partners-item-edit.component';
import { PartnersItemEditBasicsComponent } from './pages/partners/item/edit/projects-item-edit-basics/partners-item-edit-basics.component';
import { PartnersItemEditNetlinksComponent } from './pages/partners/item/edit/projects-item-edit-netlinks/partners-item-edit-netlinks.component';
import { PartnersItemEditTextsComponent } from './pages/partners/item/edit/projects-item-edit-texts/partners-item-edit-texts.component';
import { PartnersItemEditVideosComponent } from './pages/partners/item/edit/projects-item-edit-videos/partners-item-edit-videos.component';
import { PartnersItemRevisionsComponent } from './pages/partners/item/revisions/partners-item-revisions.component';
import { PartnerRevisionsResolverService } from './resolvers/partner-revisions.resolver';
import { PartnersItemRevisionsItemComponent } from './pages/partners/item/revisions/item/partners-item-revisions-item.component';
import { PartnerRevisionResolverService } from './resolvers/partner-revision.resolver';
import { CommunityComponent } from './pages/community/community.component';
import { FiletypesResolverService } from './resolvers/filetypes.resolver';
import { PartnersItemEditPartnershipsComponent } from './pages/partners/item/edit/partners-item-edit-partnerships/partners-item-edit-partnerships.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'community',
    data: {
      'title': 'community.title'
    },
    component: CommunityComponent,
  },
  {
    path: 'partners',
    data: {
      'title': 'partners.title'
    },
    component: PartnersComponent,
    resolve: {
      partnersMeta: PartnersResolverService,
    }
  },
  {
    path: 'partners/create',
    data: {
      'title': 'partners.create.title'
    },
    component: PartnersCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'partners/:id',
    component: PartnersItemComponent,
    resolve: {
      partnerMeta: PartnerResolverService,
      partnerFilesMeta: PartnerFilesResolverService
    },
  },
  {
    path: 'partners/:id/revisions',
    component: PartnersItemRevisionsComponent,
    resolve: {
      partnerMeta: PartnerResolverService,
      partnerRevisionsMeta: PartnerRevisionsResolverService
    },
  },
  {
    path: 'partners/:id/revisions/:revision_id',
    component: PartnersItemRevisionsItemComponent,
    resolve: {
      partnerRevisionMeta: PartnerRevisionResolverService
    },
  },
  {
    path: 'partners/:id/edit',
    component: PartnersItemEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      partnerMeta: PartnerResolverService
    },
    children: [
      {
        path: '',
        redirectTo: 'basics',
        pathMatch: 'full'
      },
      {
        path: 'basics',
        component: PartnersItemEditBasicsComponent,
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'links',
        component: PartnersItemEditNetlinksComponent,
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'texts',
        component: PartnersItemEditTextsComponent,
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'videos',
        component: PartnersItemEditVideosComponent,
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'partnerships',
        component: PartnersItemEditPartnershipsComponent,
        canDeactivate: [PendingChangesGuard],
        resolve: {
          tagsgroupsMeta: TagsgroupsResolverService,
        }
      },
    ]
  },
  {
    path: 'projects',
    data: {
      'title': 'projects.title'
    },
    component: ProjectsComponent,
    resolve: {
      projectsMeta: ProjectsResolverService,
      tagsgroupsMeta: TagsgroupsResolverService,
    }
  },
  {
    path: 'projects/create',
    data: {
      'title': 'projects.create.title'
    },
    component: ProjectsCreateComponent,
    canActivate: [AuthGuard],
    resolve: {
      tagsgroupsMeta: TagsgroupsResolverService,
    }
  },
  {
    path: 'projects/:id',
    component: ProjectsItemComponent,
    resolve: {
      projectMeta: ProjectResolverService,
      projectFilesMeta: ProjectFilesResolverService
    },
  },
  {
    path: 'projects/:id/revisions',
    component: ProjectsItemRevisionsComponent,
    resolve: {
      projectMeta: ProjectResolverService,
      projectRevisionsMeta: ProjectRevisionsResolverService
    },
  },
  {
    path: 'projects/:id/revisions/:revision_id',
    component: ProjectsItemRevisionsItemComponent,
    resolve: {
      // projectMeta: ProjectResolverService,
      projectRevisionMeta: ProjectRevisionResolverService
    },
  },
  {
    path: 'projects/:id/edit',
    component: ProjectsItemEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      projectMeta: ProjectResolverService
    },
    children: [
      {
        path: '',
        redirectTo: 'basics',
        pathMatch: 'full'
      },
      {
        path: 'basics',
        component: ProjectsItemEditBasicsComponent,
        resolve: {
          tagsgroupsMeta: TagsgroupsResolverService,
        },
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'properties',
        component: ProjectsItemEditPropertiesComponent,
        resolve: {
          projectPropertiesMeta: ProjectPropertiesResolverService
        },
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'links',
        component: ProjectsItemEditNetlinksComponent,
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'texts',
        component: ProjectsItemEditTextsComponent,
        canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'images',
        component: ProjectsItemEditImagesComponent,
        resolve: {
          projectFilesMeta: ProjectFilesResolverService,
          filetypesMeta: FiletypesResolverService
        }
      },
      {
        path: 'videos',
        component: ProjectsItemEditVideosComponent,
        canDeactivate: [PendingChangesGuard],
      },
    ]
  },
  {
    path: 'about',
    data: {
      'title': 'about.title'
    },
    component: AboutComponent
  },
  {
    path: 'legal',
    children: [
      {
        path: 'terms-of-service',
        component: LegalTosComponent
      },
      {
        path: 'privacy-policy',
        component: LegalPrivacyComponent
      }
    ]
  },
  {
    path: 'login',
    data: {
      'title': 'authentication.login.title'
    },
    component: LoginComponent,
  },
  {
    path: 'register',
    data: {
      'title': 'authentication.register.title'
    },
    component: RegisterComponent,
  },
  {
    path: 'account-password-reset/:token',
    data: {
      'title': 'authentication.password-reset.title'
    },
    component: AccountPasswordResetComponent,
  },
  {
    path: 'account-activate/:token',
    component: AccountActivateComponent,
  },
  {
    path: 'account-password-reset',
    data: {
      'title': 'authentication.password-reset.title'
    },
    component: AccountPasswordResetComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    data: {
      'title': '404'
    },
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',

      // TODO: fix, it doesn't work
      // scrollPositionRestoration: 'enabled',

    }),
  ],
  exports: [RouterModule],
  // declarations: [ChildComponent]
})
export class AppRoutingModule { }
