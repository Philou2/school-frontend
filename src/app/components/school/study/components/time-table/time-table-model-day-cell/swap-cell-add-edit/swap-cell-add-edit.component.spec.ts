import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapCellAddEditComponent } from './swap-cell-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: SwapCellAddEditComponent;
  let fixture: ComponentFixture<SwapCellAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwapCellAddEditComponent]
    });
    fixture = TestBed.createComponent(SwapCellAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
