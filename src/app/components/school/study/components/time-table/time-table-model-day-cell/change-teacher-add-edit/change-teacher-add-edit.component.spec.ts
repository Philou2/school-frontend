import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTeacherAddEditComponent } from './change-teacher-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ChangeTeacherAddEditComponent;
  let fixture: ComponentFixture<ChangeTeacherAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeTeacherAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeTeacherAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
