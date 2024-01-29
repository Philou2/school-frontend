import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordUpdateComponent } from './user-password-update.component';

describe('ParticipantAddEditComponent', () => {
  let component: UserPasswordUpdateComponent;
  let fixture: ComponentFixture<UserPasswordUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPasswordUpdateComponent]
    });
    fixture = TestBed.createComponent(UserPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
