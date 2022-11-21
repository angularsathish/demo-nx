import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TableButtonAction } from '@demo-nx/interfaces';
import { CoursesEntity } from '@demo-nx/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-nx-lookup-course',
  templateUrl: './lookup-course.component.html',
  styleUrls: ['./lookup-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LookupCourseComponent {
  data: CoursesEntity[] = [];
  @Input()
  set courseList(courses: Observable<CoursesEntity[]>) {
    courses.subscribe((val) => {
      this.data = [];
      if (val.length) {
        this.data = val;
      }
    });
  }

  columns = [
    { columnDef: 'courseName', header: 'Name' },
    { columnDef: 'courseCode', header: 'Code' },
    { columnDef: 'coursePrice', header: 'Price' },
    { columnDef: 'maxStudent', header: 'Maximum' },
    { columnDef: 'professorDetail', header: 'HOD' },
    { columnDef: 'timeLength', header: 'Time' },
  ];

  @Output() crudStatus: EventEmitter<{ table: string; data: null }> =
    new EventEmitter();

  onTableAction(event: TableButtonAction) {
    console.log('event', event);
    switch (event.name) {
      case 'ADD':
        this.crudStatus.emit({ table: 'ADD', data: null });
        break;

      case 'EDIT':
        this.crudStatus.emit({ table: 'EDIT', data: event.value });
        break;

      case 'VIEW':
        // this.router.navigate(['/' + rolename + '/course/parent/profile']);
        break;

      case 'DELETE':
        this.crudStatus.emit({ table: 'DELETE', data: event.value });
        break;

      default:
        break;
    }
  }
}
