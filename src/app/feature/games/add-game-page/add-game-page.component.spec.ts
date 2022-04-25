import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGamePageComponent } from './add-game-page.component';

describe('AddGamePageComponent', () => {
  let component: AddGamePageComponent;
  let fixture: ComponentFixture<AddGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
