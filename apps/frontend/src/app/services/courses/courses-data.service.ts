import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { CoursesEntity } from '@demo-nx/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root',
})
export class CoursesDataService extends DefaultDataService<CoursesEntity> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenerator);
  }

  getAll(): Observable<CoursesEntity[]> {
    return this.http
      .get('http://localhost:3000/api/course')
      .pipe(map((res) => res['results']['data']));
  }

  add(entity: CoursesEntity): Observable<CoursesEntity> {
    return this.http
      .post('http://localhost:3000/api/course/add', entity)
      .pipe(map((res) => res['results']['data']));
  }

  update(update: Update<CoursesEntity>): Observable<CoursesEntity> {
    const id = update.id;
    return this.http
      .patch(`http://localhost:3000/api/course/update/${id}`, update.changes)
      .pipe(map((res) => res['results']['data']));
  }

  delete(key: string | number): Observable<string | number> {
    return this.http
      .delete(`http://localhost:3000/api/course/delete/${key}`)
      .pipe(map((res) => res['results']['data']));
  }
}
