import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, map, Observable, take } from 'rxjs';
import { IGame } from '../interfaces';
import { environment } from 'src/environments/environment';
import { ReviewService } from './review.service';

@Injectable()
export class GameService {

  constructor(private http: HttpClient, private reviewService: ReviewService) { }

  loadGames$(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.firebase.databaseURL}/games.json`);
  }

  loadGameById$(_id: string): Observable<IGame> {
    return this.http.get<IGame>(`${environment.firebase.databaseURL}/games/${_id}.json`);
  }

  loadTopThree$(highest: boolean): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.firebase.databaseURL}/games.json`)
    .pipe(
      map(games => { 
        return games.sort((g1: IGame, g2: IGame) => highest ? (g1.average - g2.average) : (g2.average - g1.average)) 
      }),
      take(3)
    )
  }
}
