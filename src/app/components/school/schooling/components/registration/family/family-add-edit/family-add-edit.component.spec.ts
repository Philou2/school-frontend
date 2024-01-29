import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAddEditComponent } from './family-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: FamilyAddEditComponent;
  let fixture: ComponentFixture<FamilyAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyAddEditComponent]
    });
    fixture = TestBed.createComponent(FamilyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
