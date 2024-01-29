import { TestBed } from '@angular/core/testing';

import { ManagerTypeService } from './manager-type.service';

describe('MenuService', () => {
  let service: ManagerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
