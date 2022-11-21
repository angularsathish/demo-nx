import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

const Component = [
  BreadcrumbComponent,
  FeatherIconsComponent,
  PageLoaderComponent,
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule.pick(allIcons),
    PerfectScrollbarModule,
    NgbModule,
    LoadingBarRouterModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [Component],
  exports: [
    Component,
    FeatherModule,
    PerfectScrollbarModule,
    NgbModule,
    RouterModule,
    LoadingBarRouterModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SharedModule {}
