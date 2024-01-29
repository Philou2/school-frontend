import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddComponent } from './branch-add.component';

describe('ParticipantAddEditComponent', () => {
  let component: BranchAddComponent;
  let fixture: ComponentFixture<BranchAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchAddComponent]
    });
    fixture = TestBed.createComponent(BranchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
