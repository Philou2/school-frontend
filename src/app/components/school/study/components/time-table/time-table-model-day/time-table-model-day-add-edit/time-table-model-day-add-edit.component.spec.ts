import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableModelDayAddEditComponent } from './time-table-model-day-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: TimeTableModelDayAddEditComponent;
  let fixture: ComponentFixture<TimeTableModelDayAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTableModelDayAddEditComponent]
    });
    fixture = TestBed.createComponent(TimeTableModelDayAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
