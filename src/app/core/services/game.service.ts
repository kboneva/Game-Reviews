import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { IGame } from '../interfaces';
import { environment } from 'src/environments/environment';
import { child, Database, equalTo, onValue, push, query, ref, remove, set, update } from '@angular/fire/database';
import { orderByChild } from '@firebase/database';
import { NotificationService, NotificationType } from './notification.service';
import { processError, processSuccess } from 'src/app/auth/utils';

@Injectable()
export class GameService {

  constructor(private http: HttpClient, private db: Database, private notifService: NotificationService) { }

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

    await set(ref(this.db, 'games/' + _id + '/average'), average)
    .catch(err => {
      processError(err, this.notifService);
    });
  }

  async addGame$(data: {title: string, description: string, developer: string, genre: string, releaseDate: string}){
    const gameId = push(child(ref(this.db), 'games')).key;

    const game = {
      _id: gameId,
      title: data.title,
      description: data.description,
      developer: data.developer,
      genre: data.genre.split(", "),
      releaseDate: data.releaseDate,
      average: 0
    }

    await set(ref(this.db, 'games/' + gameId), game)
    .then(() => {
      processSuccess("Added game", this.notifService);
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }

  async updateGame$(gameId: string, data: {title: string, description: string, developer: string, genre: string, releaseDate: string}) {
    const game = {
      title: data.title,
      description: data.description,
      developer: data.developer,
      genre: data.genre.split(",").map(g => g.trim()),
      releaseDate: data.releaseDate
    }

    await update(ref(this.db, 'games/' + gameId), game)
    .then(() => {
      processSuccess("Added game", this.notifService);
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }

  async deleteGame$(gameId: string) {
    await remove(ref(this.db, 'games/' + gameId))
    .then(() => {
      processSuccess("Deleted game", this.notifService);
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }
}
