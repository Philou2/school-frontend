import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAddEditComponent } from './permission-add-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: PermissionAddEditComponent;
  let fixture: ComponentFixture<PermissionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionAddEditComponent]
    });
    fixture = TestBed.createComponent(PermissionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
