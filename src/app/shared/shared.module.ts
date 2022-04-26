import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    ReviewComponent,
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
    NotificationComponent
  ]
})
export class SharedModule { }
