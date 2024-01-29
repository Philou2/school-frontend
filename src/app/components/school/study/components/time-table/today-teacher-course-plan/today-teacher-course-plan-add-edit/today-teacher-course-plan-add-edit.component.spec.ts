import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTeacherCoursePlanAddEditComponent } from './today-teacher-course-plan-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: TodayTeacherCoursePlanAddEditComponent;
  let fixture: ComponentFixture<TodayTeacherCoursePlanAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayTeacherCoursePlanAddEditComponent]
    });
    fixture = TestBed.createComponent(TodayTeacherCoursePlanAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
