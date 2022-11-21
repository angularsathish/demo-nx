import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@demo-nx/auth';
import { AuthGuard } from '@demo-nx/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, HttpUrlGenerator } from '@ngrx/data';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { SharedModule } from '@demo-nx/shared';
import { LayoutModule } from '@demo-nx/layout';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CustomUrlHttpGeneralGeneratorService } from '@services/custom-url-http-general-generator.service';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () => import('@demo-nx/auth').then((a) => a.AuthModule),
        },
        {
          path: '',
          component: MainLayoutComponent,
          // canActivate: [AuthGuard],
          children: [
            { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
            {
              path: 'admin',
              // canActivate: [AuthGuard],
              data: {
                role: 'Admin',
              },
              loadChildren: () =>
                import('./modules/admin/admin.module').then(
                  (m) => m.AdminModule
                ),
            },
            {
              path: 'parent',
              // canActivate: [AuthGuard],
              data: {
                role: 'Parent',
              },
              loadChildren: () =>
                import('./modules/parent/parent.module').then(
                  (m) => m.ParentModule
                ),
            },
            {
              path: 'student',
              canActivate: [AuthGuard],
              data: {
                role: 'Student',
              },
              loadChildren: () =>
                import('./modules/student/student.module').then(
                  (m) => m.StudentModule
                ),
            },
            {
              path: 'teacher',
              canActivate: [AuthGuard],
              data: {
                role: 'Teacher',
              },
              loadChildren: () =>
                import('./modules/teacher/teacher.module').then(
                  (m) => m.TeacherModule
                ),
            },
          ],
        },
      ]
      // {
      //   initialNavigation: 'enabledBlocking',
      // }
    ),
    AuthModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HttpUrlGenerator,
      useClass: CustomUrlHttpGeneralGeneratorService,
    },
  ],
})
export class AppModule {}
