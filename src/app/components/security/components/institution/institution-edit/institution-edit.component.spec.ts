import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionEditComponent } from './institution-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: InstitutionEditComponent;
  let fixture: ComponentFixture<InstitutionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionEditComponent]
    });
    fixture = TestBed.createComponent(InstitutionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
