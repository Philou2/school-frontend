import { TestBed } from '@angular/core/testing';
import {RepeatingService} from './repeating.service';


describe('RepeatingService', () => {
  let service: RepeatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
