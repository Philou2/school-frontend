import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseHeadingAddEditComponent } from './expense-heading-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ExpenseHeadingAddEditComponent;
  let fixture: ComponentFixture<ExpenseHeadingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseHeadingAddEditComponent]
    });
    fixture = TestBed.createComponent(ExpenseHeadingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
