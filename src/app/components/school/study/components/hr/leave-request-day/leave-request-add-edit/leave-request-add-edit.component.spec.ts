import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestAddEditComponent } from './leave-request-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: LeaveRequestAddEditComponent;
  let fixture: ComponentFixture<LeaveRequestAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestAddEditComponent]
    });
    fixture = TestBed.createComponent(LeaveRequestAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
