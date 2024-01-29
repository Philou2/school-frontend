import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkEntryByNameComponent } from './school-mark-entry-by-name.component';

describe('SchoolMarkEntryByNameComponent', () => {
  let component: SchoolMarkEntryByNameComponent;
  let fixture: ComponentFixture<SchoolMarkEntryByNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkEntryByNameComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkEntryByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
