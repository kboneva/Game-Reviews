import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGamesPageComponent } from './all-games-page.component';

describe('AllGamesPageComponent', () => {
  let component: AllGamesPageComponent;
  let fixture: ComponentFixture<AllGamesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGamesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
