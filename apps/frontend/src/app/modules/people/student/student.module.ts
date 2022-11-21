import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { LookupStudentComponent } from './lookup-student/lookup-student.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

import { DynamicTableModule } from '@demo-nx/dynamic-table';
import { SharedModule } from '@demo-nx/shared';
import { MaterialModule } from '@demo-nx/material';
import { MatTabsModule } from '@angular/material/tabs';
import { PeopleModule } from '../people.module';

@NgModule({
  declarations: [
    LookupStudentComponent,
    ProfileStudentComponent,
    UpdateStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    DynamicTableModule,
    SharedModule,
    MaterialModule,
    MatTabsModule,
    PeopleModule,
  ],
})
export class StudentModule {}
