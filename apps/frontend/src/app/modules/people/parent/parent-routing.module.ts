import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateParentComponent } from './update-parent/update-parent.component';
import { LookupParentComponent } from './lookup-parent/lookup-parent.component';
import { ProfileParentComponent } from './profile-parent/profile-parent.component';

const routes: Routes = [
  { path: 'list', component: LookupParentComponent },
  { path: 'add', component: UpdateParentComponent },
  { path: 'profile', component: ProfileParentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRoutingModule {}
