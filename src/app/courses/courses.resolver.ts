import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './courses.actions';
import { areCoursesLoaded } from './courses.selector';

export const coursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const store = inject(Store);
  let loading = false;

  return store.pipe(
    select(areCoursesLoaded),
    tap((coursesLoaded) => {
      if (!loading && !coursesLoaded) {
        loading = true;
        store.dispatch(loadAllCourses());
      }
    }),
    filter((coursesLoaded) => coursesLoaded),
    first(),
    finalize(() => {
      loading = false;
    }),
  );
};
