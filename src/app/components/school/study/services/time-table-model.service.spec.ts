import { TestBed } from '@angular/core/testing';
import {TimeTableModelService} from "./time-table-model.service";


describe('TimeTableModelService', () => {
  let service: TimeTableModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
