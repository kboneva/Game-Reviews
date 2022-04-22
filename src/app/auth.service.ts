import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, AuthErrorCodes, User } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<User>(undefined!);

  currentUser$ = this._currentUser.asObservable();
  currentId$ = this.currentUser$.pipe(map(user => user.uid));
  isLogged$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private auth: Auth, private router: Router, private db: Database) { 
    this.authStateListener();
  }

  authStateListener() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this._currentUser.next(user);
      } 
      else {
        this._currentUser.next(undefined!);
      }
    });
  }

  register(userData: {username: string, email: string, password: string, repeatPassword: string}): void {
    // TODO validate
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(userCredential => {
      const user = userCredential.user;
      const avatarUrl = '/assets/avatar.jpg';
      updateProfile(user, {displayName: userData.username, photoURL: avatarUrl});
      set(ref(this.db, 'users/' + user.uid), {
        _id: user.uid,
        avatar: avatarUrl,
        username: userData.username,
        reviews: []
      })
      .catch(error => {
        console.log(error);
      })
    })
    .then(() => {
      this.router.navigate(["/home"]);
    })
    .catch(error => {
      if (error.code == AuthErrorCodes.EMAIL_EXISTS){
        console.log("Email already in use!"); // TODO error pop-ups
      }
      else console.log("Something went wrong.")
    })
  }


  login(userData: {email: string, password: string}): void {
    // TODO validate
    
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(() => {
      this.router.navigate(["/home"]);
    })
    .catch((error) => {
      if(error.code == AuthErrorCodes.USER_DELETED){
        console.log("No such user found!"); // TODO error pop-ups
      }
      else console.log("Something went wrong.")
    });
  }


  logout(): void {
    signOut(this.auth)
    .then(() => {
      this.router.navigate(["/user/login"]);
    });
  }
}
