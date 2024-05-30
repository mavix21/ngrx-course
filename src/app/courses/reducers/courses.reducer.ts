import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-type';
import { Course, compareCourses } from '../model/course';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});
export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, { courses }) =>
    adapter.addMany(courses, {
      ...state,
      allCoursesLoaded: true,
    }),
  ),
  on(CourseActions.courseUpdated, (state, { update }) =>
    adapter.updateOne(update, state),
  ),
);

export const { selectAll } = adapter.getSelectors();
