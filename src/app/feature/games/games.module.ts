import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesListItemComponent } from './games-list-item/games-list-item.component';
import { AllGamesPageComponent } from './all-games-page/all-games-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GamesRoutingModule } from './games-routing.module';



@NgModule({
  declarations: [
    GameComponent,
    GamesListComponent,
    GamesListItemComponent,
    AllGamesPageComponent,
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})

export class GamesModule { }
