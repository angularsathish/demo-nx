import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { LookupDepartmentComponent } from './lookup-department/lookup-department.component';

import { DynamicTableModule } from '@demo-nx/dynamic-table';
import { SharedModule } from '@demo-nx/shared';
import { MaterialModule } from '@demo-nx/material';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [UpdateDepartmentComponent, LookupDepartmentComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    DynamicTableModule,
    SharedModule,
    MaterialModule,
    MatTabsModule,
  ],
})
export class DepartmentsModule {}
