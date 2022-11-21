import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@demo-nx/shared';
import { MaterialModule } from '@demo-nx/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { PeopleRoutingModule } from './people-routing.module';
import { AddressDetailComponent } from './shared/address-detail/address-detail.component';
import { BasicDetailComponent } from './shared/basic-detail/basic-detail.component';
import { LoginDetailComponent } from './shared/login-detail/login-detail.component';

@NgModule({
  declarations: [
    AddressDetailComponent,
    BasicDetailComponent,
    LoginDetailComponent,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule,
    MaterialModule,
    MatAutocompleteModule,
    MatDatepickerModule,
  ],
  exports: [AddressDetailComponent, BasicDetailComponent, LoginDetailComponent],
})
export class PeopleModule {}
