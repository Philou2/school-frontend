import { TestBed } from '@angular/core/testing';

import { DiplomaTypeService } from './diploma-type.service';

describe('MenuService', () => {
  let service: DiplomaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
