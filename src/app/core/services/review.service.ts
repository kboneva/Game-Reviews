import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { child, Database, push, ref, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReview } from '../interfaces';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient, private db: Database) { }

  loadReviewById$(_id: string): Observable<IReview> {
    return this.http.get<IReview>(`${environment.firebase.databaseURL}/reviews/${_id}.json`);
  }

  async submitReview$(reviewData: {rating: number, text: string}, gameId: string, userId: string): Promise<void> {
    const review = {
      rating: reviewData.rating,
      text: reviewData.text,
      userId: userId,
      gameId: gameId,
      postedAt: formatDate(Date.now(), 'YYYY-MM-dd', 'en')
    }

    const reviewId = push(child(ref(this.db), 'reviews')).key;

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = review;
    updates[`/users/${userId}/reviews/${reviewId}`] = true;
    updates[`/games/${gameId}/reviews/${reviewId}`] = true;

    await update(ref(this.db), updates)
    .catch(error => {
      console.log(error);
    })
  }

  async deleteReview$(reviewId: string, userId: string, gameId: string): Promise<void> {
    const updates: any = {};
    updates[`/reviews/${reviewId}`] = null;
    updates[`/users/${userId}/reviews/${reviewId}`] = null;
    updates[`/games/${gameId}/reviews/${reviewId}`] = null;

    await update(ref(this.db), updates)
    .catch(error => {
      console.log(error);
    })
  }

  async updateReview$(reviewId: string, formData: {rating: number, text: string}): Promise<void> {
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
