import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'people',
    loadChildren: () =>
      import('../people/people.module').then((a) => a.PeopleModule),
  },
  {
    path: 'department',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (a) => a.DepartmentsModule
      ),
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./courses/courses.module').then((a) => a.CoursesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
