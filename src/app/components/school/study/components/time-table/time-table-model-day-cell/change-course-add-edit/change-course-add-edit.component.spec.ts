import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCourseAddEditComponent } from './change-course-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ChangeCourseAddEditComponent;
  let fixture: ComponentFixture<ChangeCourseAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeCourseAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeCourseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
