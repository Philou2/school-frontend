import { TestBed } from '@angular/core/testing';

import { ModuleService } from './module.service';
import {ClassProgramService} from './class-program.service';

describe('ClassProgramService', () => {
  let service: ClassProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
