import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudCourseRegistrationStudentComponent } from './stud-course-registration-student.component';

describe('StudCourseRegistrationStudentComponent', () => {
  let component: StudCourseRegistrationStudentComponent;
  let fixture: ComponentFixture<StudCourseRegistrationStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudCourseRegistrationStudentComponent]
    });
    fixture = TestBed.createComponent(StudCourseRegistrationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
