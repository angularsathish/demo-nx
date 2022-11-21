import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { UpdateParentComponent } from './update-parent/update-parent.component';
import { LookupParentComponent } from './lookup-parent/lookup-parent.component';
import { ProfileParentComponent } from './profile-parent/profile-parent.component';

import { DynamicTableModule } from '@demo-nx/dynamic-table';
import { SharedModule } from '@demo-nx/shared';
import { MaterialModule } from '@demo-nx/material';
import { MatTabsModule } from '@angular/material/tabs';
import { PeopleModule } from '../people.module';
@NgModule({
  declarations: [
    UpdateParentComponent,
    LookupParentComponent,
    ProfileParentComponent,
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    DynamicTableModule,
    SharedModule,
    MaterialModule,
    MatTabsModule,
    PeopleModule,
  ],
})
export class ParentModule {}
