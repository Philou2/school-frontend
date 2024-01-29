import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkEntryByAnonymityComponent } from './school-mark-entry-by-anonymity.component';

describe('SchoolMarkEntryByAnonymityComponent', () => {
  let component: SchoolMarkEntryByAnonymityComponent;
  let fixture: ComponentFixture<SchoolMarkEntryByAnonymityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkEntryByAnonymityComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkEntryByAnonymityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
