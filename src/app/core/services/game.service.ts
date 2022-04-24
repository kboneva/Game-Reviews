import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { IGame } from '../interfaces';
import { environment } from 'src/environments/environment';
import { Database, equalTo, onValue, query, ref, set } from '@angular/fire/database';
import { orderByChild } from '@firebase/database';

@Injectable()
export class GameService {

  constructor(private http: HttpClient, private db: Database) { }

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

  async gameListener(_id: string) {
    onValue(query(ref(this.db, 'reviews'), orderByChild('gameId'), equalTo(_id)), async (snapshot) => {
      const data = snapshot.val();
      await this.updateAverage(_id, data);
    });
  }

  async updateAverage(_id: string, data: any) {

    const array = data ? Object.values(data) : null;
    const average = array ? array.map((item: any) => item.rating).reduce((a: number, b: number) => a + b)/array.length : 0;

    await set(ref(this.db, 'games/' + _id + '/average'), average);
    return average;
  }
}
