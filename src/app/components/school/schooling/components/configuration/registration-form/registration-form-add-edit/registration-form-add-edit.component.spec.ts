import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormAddEditComponent } from './registration-form-add-edit.component';

describe('RegistrationFormAddEditComponent', () => {
  let component: RegistrationFormAddEditComponent;
  let fixture: ComponentFixture<RegistrationFormAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFormAddEditComponent]
    });
    fixture = TestBed.createComponent(RegistrationFormAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
