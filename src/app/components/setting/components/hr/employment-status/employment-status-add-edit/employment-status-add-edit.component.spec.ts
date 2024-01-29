import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentStatusAddEditComponent } from './employment-status-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: EmploymentStatusAddEditComponent;
  let fixture: ComponentFixture<EmploymentStatusAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentStatusAddEditComponent]
    });
    fixture = TestBed.createComponent(EmploymentStatusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
