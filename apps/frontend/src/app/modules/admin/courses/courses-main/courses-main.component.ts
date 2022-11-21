import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LookupCourseComponent } from '../lookup-course/lookup-course.component';
import { UpdateCourseComponent } from '../update-course/update-course.component';
import { CoursesEntity } from '@demo-nx/interfaces';
import { Observable } from 'rxjs';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';

@Component({
  selector: 'demo-nx-courses-main',
  templateUrl: './courses-main.component.html',
  styleUrls: ['./courses-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesMainComponent implements AfterViewInit {
  courses: Observable<CoursesEntity[]>;
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  lookupClass = LookupCourseComponent;
  updateClass = UpdateCourseComponent;
  courseService: EntityCollectionService<CoursesEntity>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    entityCollectionServiceFactory: EntityCollectionServiceFactory
  ) {
    this.courseService =
      entityCollectionServiceFactory.create<CoursesEntity>('Course');
    this.courses = this.courseService.entities$;
    console.log(this.courses, 'courses');
  }

  ngAfterViewInit() {
    this.addTable();
  }

  destroyComponent(comp) {
    comp.destroy();
    comp.changeDetectorRef.detectChanges();
  }

  public addTable(): void {
    this.courseService.getAll();
    const component = this.viewContainerRef.createComponent(this.lookupClass);
    component.changeDetectorRef.detectChanges();
    const inst = <any>component.instance;
    inst.courseList = this.courses;
    inst.crudStatus.subscribe((course) => {
      if (course.table === 'ADD' || course.table === 'EDIT') {
        this.destroyComponent(component);
        this.crudComponent(course.data);
      }
      if (course.table === 'DELETE') {
        this.delete(course.data.id);
      }
    });
  }

  public crudComponent(course: CoursesEntity): void {
    console.log('course', course);
    const component = this.viewContainerRef.createComponent(this.updateClass);
    component.changeDetectorRef.detectChanges();
    const inst = <any>component.instance;
    inst.courseData = course;
    inst.crudStatus.subscribe((data: CoursesEntity) => {
      if (data.id === '') {
        this.courseService.add(data).subscribe({
          next: (value: any) => {
            console.log('val');
          },
          error: (error: any) => {
            console.log('err');
          },
          complete: () => {
            this.destroyComponent(component);
            this.addTable();
          },
        });
      } else {
        this.courseService.update(data).subscribe({
          next: (value: any) => {
            console.log('val');
          },
          error: (error: any) => {
            console.log('err');
          },
          complete: () => {
            this.destroyComponent(component);
            this.addTable();
          },
        });
      }
    });
  }

  delete(courseId) {
    this.courseService.delete(courseId).subscribe({
      next: (value: any) => {
        console.log('val');
      },
      error: (error: any) => {
        console.log('err');
      },
      complete: () => {
        this.courseService.getAll();
      },
    });
  }
}
