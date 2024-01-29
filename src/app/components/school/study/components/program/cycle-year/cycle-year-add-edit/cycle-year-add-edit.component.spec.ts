import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleYearAddEditComponent } from './cycle-year-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: CycleYearAddEditComponent;
  let fixture: ComponentFixture<CycleYearAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CycleYearAddEditComponent]
    });
    fixture = TestBed.createComponent(CycleYearAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
