import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCoursePermutationAddEditComponent } from './request-course-permutation-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: RequestCoursePermutationAddEditComponent;
  let fixture: ComponentFixture<RequestCoursePermutationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCoursePermutationAddEditComponent]
    });
    fixture = TestBed.createComponent(RequestCoursePermutationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
