import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { child, get, getDatabase, push, ref, runTransaction, update } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReview } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  loadReviewsByGameId(_id: string): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${environment.firebase.databaseURL}/reviews.json`, { params: {
      gameId:_id
    }});
  }

  loadReviewById(_id: string): Observable<IReview> {
    return this.http.get<IReview>(`${environment.firebase.databaseURL}/reviews/${_id}.json`);
  }

  submitReview$(reviewData: {rating: number, text: string}, gameId: string): void {
    const review = {
      rating: reviewData.rating,
      text: reviewData.text,
      userId: this.authService.currentUser?.uid,
      gameId: gameId,
      postedAt: formatDate(Date.now(), 'YYYY-MM-dd', 'en')
    }

    const db = getDatabase();

    const reviewId = push(child(ref(db), 'reviews')).key;

    const updates: any = {};
    updates[`/reviews/${reviewId}`] = review;
    updates[`/users/${this.authService.currentUser!.uid}/reviews/${reviewId}`] = true;
    updates[`/games/${gameId}/reviews/${reviewId}`] = true;

    update(ref(db), updates)
    .catch(error => {
      console.log(error);
    });
    this.router.navigate(["/game/" + gameId]);
  }
}
