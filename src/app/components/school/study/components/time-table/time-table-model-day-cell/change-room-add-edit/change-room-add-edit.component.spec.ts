import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRoomAddEditComponent } from './change-room-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ChangeRoomAddEditComponent;
  let fixture: ComponentFixture<ChangeRoomAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeRoomAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeRoomAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
