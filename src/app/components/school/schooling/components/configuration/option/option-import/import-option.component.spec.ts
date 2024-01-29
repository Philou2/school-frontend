import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOptionComponent } from './import-option.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportOptionComponent;
  let fixture: ComponentFixture<ImportOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportOptionComponent]
    });
    fixture = TestBed.createComponent(ImportOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
