import { TestBed } from '@angular/core/testing';
import {LeaveCharacterService} from './leave-character.service';


describe('LeaveCharacterService', () => {
  let service: LeaveCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
