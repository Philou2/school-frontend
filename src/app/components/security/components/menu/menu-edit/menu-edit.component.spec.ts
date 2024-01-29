import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditComponent } from './menu-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: MenuEditComponent;
  let fixture: ComponentFixture<MenuEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuEditComponent]
    });
    fixture = TestBed.createComponent(MenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
