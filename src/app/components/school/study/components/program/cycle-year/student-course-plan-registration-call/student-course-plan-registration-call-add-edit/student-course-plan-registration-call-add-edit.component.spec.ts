import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursePlanRegistrationCallAddEditComponent } from './student-course-plan-registration-call-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: StudentCoursePlanRegistrationCallAddEditComponent;
  let fixture: ComponentFixture<StudentCoursePlanRegistrationCallAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCoursePlanRegistrationCallAddEditComponent]
    });
    fixture = TestBed.createComponent(StudentCoursePlanRegistrationCallAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
