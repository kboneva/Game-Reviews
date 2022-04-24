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

  async submitReview$(reviewData: {rating: number, text: string}, game: IGame, userId: string): Promise<void> {
    const newAverage = !!game.reviews ? (game.average * game.reviews.length + reviewData.rating) / (game.reviews.length + 1) : reviewData.rating;

    const reviewId = push(child(ref(this.db), 'reviews')).key;

    const review = {
      _id: reviewId,
      rating: reviewData.rating,
      text: reviewData.text,
      userId: userId,
      gameId: game._id,
      postedAt: formatDate(Date.now(), 'YYYY-MM-dd', 'en')
    }
    

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = review;
    updates[`/users/${userId}/reviews/${reviewId}`] = true;
    updates[`/games/${game._id}/reviews/${reviewId}`] = true;
    updates[`/games/${game._id}/average`] = newAverage;

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

  async deleteReview$(reviewId: string, reviewRating: number, userId: string, game: IGame): Promise<void> {
    const newAverage = game.reviews.length == 1 ? 0 : (game.average * game.reviews.length - reviewRating) / (game.reviews.length - 1);

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = null;
    updates[`/users/${userId}/reviews/${reviewId}`] = null;
    updates[`/games/${game._id}/reviews/${reviewId}`] = null;
    updates[`/games/${game._id}/average`] = newAverage;

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

  async updateReview$(reviewId: string, formData: {rating: number, text: string}, game: IGame, oldRating: number): Promise<void> {
    const newAverage = (game.average * game.reviews.length - oldRating + formData.rating) / game.reviews.length;

    const updates: any = {};
    updates[`/reviews/${reviewId}/rating`] = formData.rating;
    updates[`/reviews/${reviewId}/text`] = formData.text;
    updates[`/games/${game._id}/average`] = newAverage;

    await update(ref(this.db), updates)
    .then(() => {
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
