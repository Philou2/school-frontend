import { TestBed } from '@angular/core/testing';
import {GenerateTimeTableService} from "./generate-time-table.service";


describe('GenerateTimeTableService', () => {
  let service: GenerateTimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateTimeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
