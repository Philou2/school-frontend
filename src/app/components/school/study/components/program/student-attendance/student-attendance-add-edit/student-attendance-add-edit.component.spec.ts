import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceAddEditComponent } from './student-attendance-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: StudentAttendanceAddEditComponent;
  let fixture: ComponentFixture<StudentAttendanceAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendanceAddEditComponent]
    });
    fixture = TestBed.createComponent(StudentAttendanceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
