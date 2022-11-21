import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LookupStudentComponent } from './lookup-student/lookup-student.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
const routes: Routes = [
  { path: 'list', component: LookupStudentComponent },
  { path: 'add', component: UpdateStudentComponent },
  { path: 'profile', component: ProfileStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
