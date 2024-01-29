import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPermissionComponent } from './import-permission.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportPermissionComponent;
  let fixture: ComponentFixture<ImportPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportPermissionComponent]
    });
    fixture = TestBed.createComponent(ImportPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
