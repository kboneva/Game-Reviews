import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ReviewComponent,
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ReviewComponent,
    AddReviewComponent
  ]
})
export class SharedModule { }
