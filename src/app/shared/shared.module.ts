import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeGameComponent } from './home-game/home-game.component';
import { GamesListComponent } from './games-list/games-list.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    ReviewComponent,
    HomeGameComponent,
    GamesListComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ReviewComponent,
    HomeGameComponent,
    GamesListComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
