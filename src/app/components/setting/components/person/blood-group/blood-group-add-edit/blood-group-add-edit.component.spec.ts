import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupAddEditComponent } from './blood-group-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: BloodGroupAddEditComponent;
  let fixture: ComponentFixture<BloodGroupAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodGroupAddEditComponent]
    });
    fixture = TestBed.createComponent(BloodGroupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
