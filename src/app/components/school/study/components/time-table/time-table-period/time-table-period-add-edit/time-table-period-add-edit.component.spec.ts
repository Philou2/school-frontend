import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTablePeriodAddEditComponent } from './time-table-period-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: TimeTablePeriodAddEditComponent;
  let fixture: ComponentFixture<TimeTablePeriodAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTablePeriodAddEditComponent]
    });
    fixture = TestBed.createComponent(TimeTablePeriodAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
