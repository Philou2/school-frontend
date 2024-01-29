import { TestBed } from '@angular/core/testing';

import { SchoolOfOriginService } from './school-of-origin.service';

describe('SchoolOfOriginService', () => {
  let service: SchoolOfOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolOfOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
