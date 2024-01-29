import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudCourseRegistrationAdminByStudentComponent } from './stud-course-registration-admin-by-student.component';

describe('StudCourseRegistrationAdminByStudentComponent', () => {
  let component: StudCourseRegistrationAdminByStudentComponent;
  let fixture: ComponentFixture<StudCourseRegistrationAdminByStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudCourseRegistrationAdminByStudentComponent]
    });
    fixture = TestBed.createComponent(StudCourseRegistrationAdminByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
