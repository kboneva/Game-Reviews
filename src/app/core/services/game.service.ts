import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { filter, map, Observable, take } from 'rxjs';
import { IGame } from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  loadGames$(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.firebase.databaseURL}/games.json`);
  }

  loadGameById$(_id: string): Observable<IGame> {
    return this.http.get<IGame>(`${environment.firebase.databaseURL}/games/${_id}.json`);
  }

  loadTopThree$(highest: boolean): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.firebase.databaseURL}/games.json`)
    .pipe(
      map(games => Object.values(games)
      .filter(g => g.average > 0)
      .filter(g => highest ? g.average >= 5 : g.average < 5)
      .sort((g1: IGame, g2: IGame) => highest ? (g2.average - g1.average) : (g1.average - g2.average))
      .slice(0, 3))
    )
  }
}
