import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map } from 'rxjs/operators';
import { CourseActions } from './action-type';
import { allCoursesLoaded } from './courses.actions';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffect {
  constructor(
    private action$: Actions,
    private coursesHttpService: CoursesHttpService,
  ) {}

  loadCourses$ = createEffect(() =>
    this.action$.pipe(
      ofType(CourseActions.loadAllCourses),
      exhaustMap((_) => this.coursesHttpService.findAllCourses()),
      map((courses) => allCoursesLoaded({ courses })),
    ),
  );

  saveCourses$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(({ update }) =>
          this.coursesHttpService.saveCourse(update.id, update.changes),
        ),
      ),
    { dispatch: false },
  );
}
