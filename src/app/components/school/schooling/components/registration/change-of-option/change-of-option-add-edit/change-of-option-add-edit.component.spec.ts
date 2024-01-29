import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOfOptionAddEditComponent } from './change-of-option-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ChangeOfOptionAddEditComponent;
  let fixture: ComponentFixture<ChangeOfOptionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeOfOptionAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeOfOptionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
