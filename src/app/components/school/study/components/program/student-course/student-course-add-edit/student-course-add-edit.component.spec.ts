import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseAddEditComponent } from './student-course-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: StudentCourseAddEditComponent;
  let fixture: ComponentFixture<StudentCourseAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCourseAddEditComponent]
    });
    fixture = TestBed.createComponent(StudentCourseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
