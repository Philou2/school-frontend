import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStudentRegistrationComponent } from './import-student-registration.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportStudentRegistrationComponent;
  let fixture: ComponentFixture<ImportStudentRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportStudentRegistrationComponent]
    });
    fixture = TestBed.createComponent(ImportStudentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
