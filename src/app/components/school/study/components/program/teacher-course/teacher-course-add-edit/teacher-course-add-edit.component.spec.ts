import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseAddEditComponent } from './teacher-course-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: TeacherCourseAddEditComponent;
  let fixture: ComponentFixture<TeacherCourseAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherCourseAddEditComponent]
    });
    fixture = TestBed.createComponent(TeacherCourseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
