import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkEntryByMatriculeComponent } from './school-mark-entry-by-matricule.component';

describe('SchoolMarkEntryByMatriculeComponent', () => {
  let component: SchoolMarkEntryByMatriculeComponent;
  let fixture: ComponentFixture<SchoolMarkEntryByMatriculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkEntryByMatriculeComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkEntryByMatriculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
