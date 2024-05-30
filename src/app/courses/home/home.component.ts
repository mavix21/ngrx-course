import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import {
  selectAdvanceCourses,
  selectBeginnerCourses,
  selectPromoTotal,
} from '../courses.selector';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvanceCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
