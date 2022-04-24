import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database, ref, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { processError } from 'src/app/auth/utils';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';
import { NotificationService, NotificationType } from './notification.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private db: Database, private notifService: NotificationService) { }

  loadUser$(_id: string): Observable<IUser>{
    return this.http.get<IUser>(`${environment.firebase.databaseURL}/users/${_id}.json`)
  }

  async updateProfile$(userId: string, username: string, avatar: string): Promise<void>{
    const updates: any = {};

    updates[`/users/${userId}/username`] = username;
    updates[`/users/${userId}/avatar`] = avatar;

    await update(ref(this.db), updates)
    .catch(err => {
      processError(err, this.notifService);
    });
  }
}
