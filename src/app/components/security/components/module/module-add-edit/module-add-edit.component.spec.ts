import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddEditComponent } from './module-add-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: ModuleAddEditComponent;
  let fixture: ComponentFixture<ModuleAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleAddEditComponent]
    });
    fixture = TestBed.createComponent(ModuleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
