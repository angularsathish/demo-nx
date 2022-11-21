import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { MaterialModule } from '@demo-nx/material'; // Added
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './containers/header/header.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { RightSidebarComponent } from './containers/right-sidebar/right-sidebar.component';
import { SharedModule } from '@demo-nx/shared';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    RightSidebarComponent,
  ],
  exports: [LayoutComponent, HeaderComponent],
})
export class LayoutModule {}
