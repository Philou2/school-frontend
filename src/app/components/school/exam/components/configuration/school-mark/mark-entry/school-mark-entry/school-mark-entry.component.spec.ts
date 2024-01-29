import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkEntryComponent } from './school-mark-entry.component';

describe('SchoolMarkEntryComponent', () => {
  let component: SchoolMarkEntryComponent;
  let fixture: ComponentFixture<SchoolMarkEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkEntryComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
