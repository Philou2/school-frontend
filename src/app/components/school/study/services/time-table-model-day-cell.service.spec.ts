import { TestBed } from '@angular/core/testing';
import {TimeTableModelDayCellService} from "./time-table-model-day-cell.service";


describe('TimeTableModelDayCellService', () => {
  let service: TimeTableModelDayCellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableModelDayCellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
