import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkEntryGeneralComponent } from './school-mark-entry-general.component';

describe('SchoolMarkEntryGeneralComponent', () => {
  let component: SchoolMarkEntryGeneralComponent;
  let fixture: ComponentFixture<SchoolMarkEntryGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkEntryGeneralComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkEntryGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
