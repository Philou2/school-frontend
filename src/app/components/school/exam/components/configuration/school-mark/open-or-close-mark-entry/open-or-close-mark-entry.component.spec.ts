import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrCloseMarkEntryComponent } from './open-or-close-mark-entry.component';

describe('OpenOrCloseMarkEntryComponent', () => {
  let component: OpenOrCloseMarkEntryComponent;
  let fixture: ComponentFixture<OpenOrCloseMarkEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenOrCloseMarkEntryComponent]
    });
    fixture = TestBed.createComponent(OpenOrCloseMarkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
