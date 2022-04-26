import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GamesListComponent } from './games-list/games-list.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    ReviewComponent,
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
    GamesListComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
