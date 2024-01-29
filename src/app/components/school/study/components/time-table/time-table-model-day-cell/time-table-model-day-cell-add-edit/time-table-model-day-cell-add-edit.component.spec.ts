import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableModelDayCellAddEditComponent } from './time-table-model-day-cell-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: TimeTableModelDayCellAddEditComponent;
  let fixture: ComponentFixture<TimeTableModelDayCellAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTableModelDayCellAddEditComponent]
    });
    fixture = TestBed.createComponent(TimeTableModelDayCellAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
