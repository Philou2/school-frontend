import { TestBed } from '@angular/core/testing';

import {RhesusService} from './rhesus.service';

describe('RhesusService', () => {
  let service: RhesusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RhesusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
