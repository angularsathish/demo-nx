import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LookupDepartmentComponent } from './lookup-department/lookup-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';

const routes: Routes = [
  {
    path: '',
    component: LookupDepartmentComponent,
  },
  {
    path: 'add',
    component: UpdateDepartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsRoutingModule {}
