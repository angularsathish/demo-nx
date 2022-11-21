import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'teacher',
    loadChildren: () =>
      import('./teacher/teacher.module').then((a) => a.TeacherModule),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((a) => a.StudentModule),
  },
  {
    path: 'parent',
    loadChildren: () =>
      import('./parent/parent.module').then((a) => a.ParentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
