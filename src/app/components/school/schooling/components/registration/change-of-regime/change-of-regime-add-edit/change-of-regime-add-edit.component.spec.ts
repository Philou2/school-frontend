import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOfRegimeAddEditComponent } from './change-of-regime-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ChangeOfRegimeAddEditComponent;
  let fixture: ComponentFixture<ChangeOfRegimeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeOfRegimeAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeOfRegimeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
