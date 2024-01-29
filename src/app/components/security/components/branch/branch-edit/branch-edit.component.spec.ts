import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchEditComponent } from './branch-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: BranchEditComponent;
  let fixture: ComponentFixture<BranchEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchEditComponent]
    });
    fixture = TestBed.createComponent(BranchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
