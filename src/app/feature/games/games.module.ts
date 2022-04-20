import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GamesListItemComponent } from './games-list-item/games-list-item.component';
import { AllGamesPageComponent } from './all-games-page/all-games-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GamesRoutingModule } from './games-routing.module';
import { ReviewComponent } from './review/review.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    GameComponent,
    GamesListItemComponent,
    AllGamesPageComponent,
    GamePageComponent,
    ReviewComponent,
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ReactiveFormsModule,
    NgbRatingModule
  ]
})

export class GamesModule { }
