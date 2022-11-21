import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LookupTeacherComponent } from './lookup-teacher/lookup-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';

import { DynamicTableModule } from '@demo-nx/dynamic-table';
import { SharedModule } from '@demo-nx/shared';
import { MaterialModule } from '@demo-nx/material';
import { MatTabsModule } from '@angular/material/tabs';
import { PeopleModule } from '../people.module';

@NgModule({
  declarations: [
    LookupTeacherComponent,
    UpdateTeacherComponent,
    ProfileTeacherComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    DynamicTableModule,
    SharedModule,
    MaterialModule,
    MatTabsModule,
    PeopleModule,
  ],
  exports: [
    LookupTeacherComponent,
    UpdateTeacherComponent,
    ProfileTeacherComponent,
  ],
})
export class TeacherModule {}
