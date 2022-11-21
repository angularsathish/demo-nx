/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LookupCourseComponent } from './lookup-course/lookup-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

import { DynamicTableModule } from '@demo-nx/dynamic-table';
import { SharedModule } from '@demo-nx/shared';
import { MaterialModule } from '@demo-nx/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CoursesMainComponent } from './courses-main/courses-main.component';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { CoursesDataService } from '@services/courses/courses-data.service';
import { CoursesEntity } from '@demo-nx/interfaces';

const entityMetadata: EntityMetadataMap = {
  Course: {
    selectId: (course: CoursesEntity) => course.id,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

@NgModule({
  declarations: [
    LookupCourseComponent,
    UpdateCourseComponent,
    CoursesMainComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    DynamicTableModule,
    SharedModule,
    MaterialModule,
    MatTabsModule,
    MatDatepickerModule,
  ],
})
export class CoursesModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    coursesDataService: CoursesDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Course', coursesDataService);
  }
}
