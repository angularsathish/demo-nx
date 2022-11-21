import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Authenticate, AuthenticateFormGroup } from './authenticate';
export { User, RegisterUser } from './user';
export { InConfiguration } from './config';
export { TableButtonAction } from './tableButtonAction';
export { TableColumn } from './tableColumn';
export { Department, DepFormGroup } from './department';
export { CoursesEntity } from './courses';
export { BloodGroup } from './enum/bloodGroup';
export { Gender } from './enum/gender';
export { Relation } from './enum/relation';
export { Role } from './enum/role';
export { Actions } from './enum/actions';

@NgModule({
  imports: [CommonModule],
})
export class InterfacesModule {}
