import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseRegistrationAddEditComponent } from './teacher-course-registration-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: TeacherCourseRegistrationAddEditComponent;
  let fixture: ComponentFixture<TeacherCourseRegistrationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherCourseRegistrationAddEditComponent]
    });
    fixture = TestBed.createComponent(TeacherCourseRegistrationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
