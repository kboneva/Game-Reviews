import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReview } from '../interfaces';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient) { }

  loadReviewsByGameId(_id: string): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${environment.firebase.databaseURL}/reviews.json`, { params: {
      gameId:_id
    }});
  }

  loadReviewById(_id: string): Observable<IReview> {
    return this.http.get<IReview>(`${environment.firebase.databaseURL}/reviews/${_id}.json`);
  }
}
