import { TestBed } from '@angular/core/testing';

import { SchoolMarkService } from './school-mark.service';

describe('SchoolMarkService', () => {
  let service: SchoolMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
