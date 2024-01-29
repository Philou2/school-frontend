import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCoursePostponementAddEditComponent } from './request-course-postponement-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: RequestCoursePostponementAddEditComponent;
  let fixture: ComponentFixture<RequestCoursePostponementAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCoursePostponementAddEditComponent]
    });
    fixture = TestBed.createComponent(RequestCoursePostponementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
