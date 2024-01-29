import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkAnonymityComponent } from './school-mark-anonymity.component';

describe('SchoolMarkAnonymityComponent', () => {
  let component: SchoolMarkAnonymityComponent;
  let fixture: ComponentFixture<SchoolMarkAnonymityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkAnonymityComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkAnonymityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
