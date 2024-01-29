import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomEditComponent } from './class-room-edit.component';

describe('ClassRoomEditComponent', () => {
  let component: ClassRoomEditComponent;
  let fixture: ComponentFixture<ClassRoomEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassRoomEditComponent]
    });
    fixture = TestBed.createComponent(ClassRoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
