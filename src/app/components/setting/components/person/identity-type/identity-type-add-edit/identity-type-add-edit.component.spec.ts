import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityTypeAddEditComponent } from './identity-type-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: IdentityTypeAddEditComponent;
  let fixture: ComponentFixture<IdentityTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(IdentityTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
