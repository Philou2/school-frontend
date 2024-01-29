import { TestBed } from '@angular/core/testing';
import {HourlyUnitService} from './hourly-unit.service';


describe('HourlyTypeService', () => {
  let service: HourlyUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourlyUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
