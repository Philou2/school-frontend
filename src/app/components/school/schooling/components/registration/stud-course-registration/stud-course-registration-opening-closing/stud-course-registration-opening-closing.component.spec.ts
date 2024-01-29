import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudCourseRegistrationOpeningClosingComponent } from './stud-course-registration-opening-closing.component';

describe('StudCourseRegistrationOpeningClosingComponent', () => {
  let component: StudCourseRegistrationOpeningClosingComponent;
  let fixture: ComponentFixture<StudCourseRegistrationOpeningClosingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudCourseRegistrationOpeningClosingComponent]
    });
    fixture = TestBed.createComponent(StudCourseRegistrationOpeningClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
