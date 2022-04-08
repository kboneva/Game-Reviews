import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListItemComponent } from './games-list-item.component';

describe('GamesListItemComponent', () => {
  let component: GamesListItemComponent;
  let fixture: ComponentFixture<GamesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
