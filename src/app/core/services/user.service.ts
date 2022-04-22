import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database, ref, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private db: Database) { }

  loadUser$(_id: string): Observable<IUser>{
    return this.http.get<IUser>(`${environment.firebase.databaseURL}/users/${_id}.json`)
  }

  async updateProfile$(userId: string, data: {username: string, avatar: string}): Promise<void>{
    const updates: any = {};

    updates[`/users/${userId}/username`] = data.username;
    updates[`/users/${userId}/avatar`] = data.avatar;

    await update(ref(this.db), updates)
    .catch(error => {
      console.log(error);
    })
  }

  // TODO profile stuff
}
