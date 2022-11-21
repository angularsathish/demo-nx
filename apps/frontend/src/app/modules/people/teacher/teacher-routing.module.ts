import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupTeacherComponent } from './lookup-teacher/lookup-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';

const routes: Routes = [
  { path: 'list', component: LookupTeacherComponent },
  { path: 'add', component: UpdateTeacherComponent },
  { path: 'profile', component: ProfileTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
