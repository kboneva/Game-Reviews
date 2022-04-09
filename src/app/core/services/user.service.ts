import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isLogged() {
    return !!this.currentUser;
  }

  login$(userData: {email: string, password: string}): void {

    signInWithEmailAndPassword(this.auth, userData.email, userData.password);
    console.log(this.currentUser);
  }

  logout(): void {
    signOut(this.auth);
  }
}
