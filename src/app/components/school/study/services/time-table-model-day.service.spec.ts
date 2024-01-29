import { TestBed } from '@angular/core/testing';
import {TimeTableModelDayService} from "./time-table-model-day.service";


describe('TimeTableModelDayService', () => {
  let service: TimeTableModelDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableModelDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
