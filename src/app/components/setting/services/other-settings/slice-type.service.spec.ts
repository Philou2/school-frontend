import { TestBed } from '@angular/core/testing';
import {SliceTypeService} from './slice-type.service';


describe('SliceTypeService', () => {
  let service: SliceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
