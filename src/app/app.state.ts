import type { RouterState } from '@ngrx/router-store';
import type { AuthState } from './auth/reducers';
import { CoursesState } from './courses/reducers/courses.reducer';

export interface AppState {
  auth: AuthState;
  router: RouterState;
  courses: CoursesState;
}
