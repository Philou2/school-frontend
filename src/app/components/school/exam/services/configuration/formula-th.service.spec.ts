import { TestBed } from '@angular/core/testing';

import { FormulaThService } from './formula-th.service';

describe('FormulaThService', () => {
  let service: FormulaThService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaThService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
