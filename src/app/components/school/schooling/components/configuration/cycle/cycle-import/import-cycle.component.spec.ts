import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCycleComponent } from './import-cycle.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportCycleComponent;
  let fixture: ComponentFixture<ImportCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportCycleComponent]
    });
    fixture = TestBed.createComponent(ImportCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
