import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSpecialityComponent } from './import-speciality.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportSpecialityComponent;
  let fixture: ComponentFixture<ImportSpecialityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportSpecialityComponent]
    });
    fixture = TestBed.createComponent(ImportSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
