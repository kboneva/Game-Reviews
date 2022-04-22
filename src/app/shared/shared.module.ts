import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeGameComponent } from './home-game/home-game.component';



@NgModule({
  declarations: [
    ReviewComponent,
    HomeGameComponent
  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ReviewComponent,
    HomeGameComponent
  ]
})
export class SharedModule { }
