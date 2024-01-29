import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudCourseRegistrationAdminComponent } from './stud-course-registration-admin.component';

describe('StudCourseRegistrationAdminComponent', () => {
  let component: StudCourseRegistrationAdminComponent;
  let fixture: ComponentFixture<StudCourseRegistrationAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudCourseRegistrationAdminComponent]
    });
    fixture = TestBed.createComponent(StudCourseRegistrationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
