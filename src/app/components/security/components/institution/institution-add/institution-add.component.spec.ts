import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAddComponent } from './institution-add.component';

describe('ParticipantAddEditComponent', () => {
  let component: InstitutionAddComponent;
  let fixture: ComponentFixture<InstitutionAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionAddComponent]
    });
    fixture = TestBed.createComponent(InstitutionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
