import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateCourseComponent } from './update-course/update-course.component';
import { CoursesMainComponent } from './courses-main/courses-main.component';

const routes: Routes = [
  { path: '', component: CoursesMainComponent },
  { path: 'add', component: UpdateCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
