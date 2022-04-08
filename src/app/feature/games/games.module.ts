import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesListItemComponent } from './games-list-item/games-list-item.component';



@NgModule({
  declarations: [
    GameComponent,
    GamesListComponent,
    GamesListItemComponent
  ],
  imports: [
    CommonModule
  ]
})

export class GamesModule { }
