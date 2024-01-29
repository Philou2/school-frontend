import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOfClassAddEditComponent } from './change-of-class-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ChangeOfClassAddEditComponent;
  let fixture: ComponentFixture<ChangeOfClassAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeOfClassAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeOfClassAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
