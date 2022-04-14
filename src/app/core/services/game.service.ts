import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { Database, get, orderByKey, query, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IGame } from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class GameService {

  constructor(/*private database: Database, */private http: HttpClient) { }

  // loadGames$() {
  //   get(query(ref(this.database, 'games'), orderByKey()))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       const objects =  Object.keys(snapshot.val()).map(key => ({
  //         _id: key,
  //         ...snapshot.val()[key]
  //       }))
  //       console.log(objects);
  //       return Observable.of(objects);
  //     } else {
  //       console.log("No games available");
  //       return null;
  //     }
  //   });
  // }

  loadGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${environment.firebase.databaseURL}/games.json`);
  }

  loadGameById(_id: string): Observable<IGame> {
    return this.http.get<IGame>(`${environment.firebase.databaseURL}/games/${_id}.json`);
  }
}
