import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, user } from '@angular/fire/auth'
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { getDatabase, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from './core/interfaces';
import { UserService } from './core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined!);

  currentUser$ = this._currentUser.asObservable();
  currentId$ = this._currentUser.pipe(map(user => user._id))
  isLogged$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private auth: Auth, private router: Router, private userService: UserService) { 
    this.authStateListener();
  }

  authStateListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userService.loadUser$(user.uid).subscribe(currentUser => {
          this._currentUser.next(currentUser);
        })
      } 
      else {
        this._currentUser.next(undefined!);
      }
    });
  }
  // TODO not authenticated until refresh?
  register(userData: {username: string, email: string, password: string, repeatPassword: string}): void {
    // TODO validate
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(userCredential => {
      const user = userCredential.user;
      updateProfile(user, {displayName: userData.username}); // TODO pfp
      const db = getDatabase();
      set(ref(db, 'users/' + user.uid), {
        _id: user.uid,
        username: userData.username,
        reviews: []
      })
      .catch(error => {
        console.log(error);
      })
      this.router.navigate(["/home"]);
    })
    .catch(error => {
      if (error.code == "auth/email-already-in-use"){
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
      if(error.code == "auth/user-not-found"){
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
