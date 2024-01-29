import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherYearAddEditComponent } from './teacher-year-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: TeacherYearAddEditComponent;
  let fixture: ComponentFixture<TeacherYearAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherYearAddEditComponent]
    });
    fixture = TestBed.createComponent(TeacherYearAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
