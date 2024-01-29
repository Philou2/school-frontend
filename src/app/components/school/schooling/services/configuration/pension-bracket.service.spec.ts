import { TestBed } from '@angular/core/testing';
import {PensionBracketService} from './pension-bracket.service';


describe('PensionBracketService', () => {
    let service: PensionBracketService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PensionBracketService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
