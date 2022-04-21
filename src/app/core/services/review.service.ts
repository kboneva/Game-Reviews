import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { child, Database, push, ref, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGame, IReview } from '../interfaces';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient, private db: Database) { }

  loadReviewById$(_id: string): Observable<IReview> {
    return this.http.get<IReview>(`${environment.firebase.databaseURL}/reviews/${_id}.json`);
  }

  async submitReview$(reviewData: {rating: number, text: string}, game: IGame, userId: string): Promise<void> {
    const review = {
      rating: reviewData.rating,
      text: reviewData.text,
      userId: userId,
      gameId: game._id,
      postedAt: formatDate(Date.now(), 'YYYY-MM-dd', 'en')
    }

    const reviewId = push(child(ref(this.db), 'reviews')).key;
    const newAverage = (game.average * game.reviews.length + reviewData.rating) / (game.reviews.length + 1);

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = review;
    updates[`/users/${userId}/reviews/${reviewId}`] = true;
    updates[`/games/${game._id}/reviews/${reviewId}`] = true;
    updates[`/games/${game._id}/average`] = newAverage;

    await update(ref(this.db), updates)
    .catch(error => {
      console.log(error);
    })
  }

  async deleteReview$(reviewId: string, reviewRating: number, userId: string, game: IGame): Promise<void> {
    const newAverage = (game.average * game.reviews.length - reviewRating) / (game.reviews.length - 1);

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = null;
    updates[`/users/${userId}/reviews/${reviewId}`] = null;
    updates[`/games/${game._id}/reviews/${reviewId}`] = null;
    updates[`/games/${game._id}/average`] = newAverage;

    await update(ref(this.db), updates)
    .catch(error => {
      console.log(error);
    })
  }

  async updateReview$(reviewId: string, formData: {rating: number, text: string}): Promise<void> {
    //const newAverage = (game.average * game.reviews.length + reviewData.rating) / (game.reviews.length + 1); TODO update average rating when editing reviews

    const data = {
      rating: formData.rating,
      text: formData.text
    }

    await update(ref(this.db, 'reviews/' + reviewId), data)
    .catch(error => {
      console.log(error);
    });
  }
}
