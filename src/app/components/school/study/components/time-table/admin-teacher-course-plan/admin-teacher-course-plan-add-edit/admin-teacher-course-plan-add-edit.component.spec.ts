import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherCoursePlanAddEditComponent } from './admin-teacher-course-plan-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: AdminTeacherCoursePlanAddEditComponent;
  let fixture: ComponentFixture<AdminTeacherCoursePlanAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTeacherCoursePlanAddEditComponent]
    });
    fixture = TestBed.createComponent(AdminTeacherCoursePlanAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
