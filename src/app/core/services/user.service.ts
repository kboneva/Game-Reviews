import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  loadUser$(_id: string): Observable<IUser>{
    return this.http.get<IUser>(`${environment.firebase.databaseURL}/users/${_id}.json`)
  }

  // TODO profile stuff
}
