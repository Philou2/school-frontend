import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInstitutionUpdateComponent } from './user-institution-update.component';

describe('ParticipantAddEditComponent', () => {
  let component: UserInstitutionUpdateComponent;
  let fixture: ComponentFixture<UserInstitutionUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInstitutionUpdateComponent]
    });
    fixture = TestBed.createComponent(UserInstitutionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
