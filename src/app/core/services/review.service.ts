import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { child, Database, push, ref, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { processError } from 'src/app/auth/utils';
import { environment } from 'src/environments/environment';
import { IGame, IReview } from '../interfaces';
import { NotificationService, NotificationType } from './notification.service';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient, private db: Database, private notifService: NotificationService) { }

  loadReviewById$(_id: string): Observable<IReview> {
    return this.http.get<IReview>(`${environment.firebase.databaseURL}/reviews/${_id}.json`);
  }

  async submitReview$(reviewData: {rating: number, text: string}, gameId: string, userId: string): Promise<void> {

    const reviewId = push(child(ref(this.db), 'reviews')).key;

    const review = {
      _id: reviewId,
      rating: reviewData.rating,
      text: reviewData.text,
      userId: userId,
      gameId: gameId,
      postedAt: formatDate(Date.now(), 'YYYY-MM-dd', 'en')
    }
    

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = review;
    updates[`/users/${userId}/reviews/${reviewId}`] = true;
    updates[`/games/${gameId}/reviews/${reviewId}`] = true;

    await update(ref(this.db), updates)
    .then(() => {
      this.notifService.notify({
        message:"Submitted review",
        type: NotificationType.Success
      })
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }

  async deleteReview$(reviewId: string, gameId: string, userId: string): Promise<void> {

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = null;
    updates[`/users/${userId}/reviews/${reviewId}`] = null;
    updates[`/games/${gameId}/reviews/${reviewId}`] = null;

    await update(ref(this.db), updates)
    .then(() => {
      this.notifService.notify({
        message:"Deleted review",
        type: NotificationType.Success
      })
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }

  async updateReview$(reviewId: string, formData: {rating: number, text: string}): Promise<void> {

    const updates: any = {};
    updates[`/reviews/${reviewId}/rating`] = formData.rating;
    updates[`/reviews/${reviewId}/text`] = formData.text;

    await update(ref(this.db), updates)
    .then(async () => {
      this.notifService.notify({
        message:"Updated review",
        type: NotificationType.Success
      })
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }
}
