import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendancePerClassAndDateAddEditComponent } from './student-attendance-per-class-and-date-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: StudentAttendancePerClassAndDateAddEditComponent;
  let fixture: ComponentFixture<StudentAttendancePerClassAndDateAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendancePerClassAndDateAddEditComponent]
    });
    fixture = TestBed.createComponent(StudentAttendancePerClassAndDateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
