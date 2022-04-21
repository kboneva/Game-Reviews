import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GamesListItemComponent } from './games-list-item/games-list-item.component';
import { AllGamesPageComponent } from './all-games-page/all-games-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GamesRoutingModule } from './games-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    GameComponent,
    GamesListItemComponent,
    AllGamesPageComponent,
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbRatingModule
  ]
})

export class GamesModule { }
