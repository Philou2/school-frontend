import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTeacherCoursePlanAddEditComponent } from './list-of-teacher-course-plan-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ListOfTeacherCoursePlanAddEditComponent;
  let fixture: ComponentFixture<ListOfTeacherCoursePlanAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfTeacherCoursePlanAddEditComponent]
    });
    fixture = TestBed.createComponent(ListOfTeacherCoursePlanAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
