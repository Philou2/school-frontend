import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudCourseRegistrationAdminByClassComponent } from './stud-course-registration-admin-by-class.component';

describe('StudCourseRegistrationAdminByClassComponent', () => {
  let component: StudCourseRegistrationAdminByClassComponent;
  let fixture: ComponentFixture<StudCourseRegistrationAdminByClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudCourseRegistrationAdminByClassComponent]
    });
    fixture = TestBed.createComponent(StudCourseRegistrationAdminByClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
