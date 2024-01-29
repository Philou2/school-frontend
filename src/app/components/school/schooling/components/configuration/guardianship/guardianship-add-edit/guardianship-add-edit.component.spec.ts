import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianshipAddEditComponent } from './guardianship-add-edit.component';

describe('GuardianshipAddEditComponent', () => {
  let component: GuardianshipAddEditComponent;
  let fixture: ComponentFixture<GuardianshipAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianshipAddEditComponent]
    });
    fixture = TestBed.createComponent(GuardianshipAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
