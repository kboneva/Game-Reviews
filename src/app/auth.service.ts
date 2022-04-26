import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, User } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { processError, processSuccess } from './auth/utils';
import { NotificationService } from './core/services/notification.service';
import { UserService } from './core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<User>(undefined!);
  private _currentRole = new BehaviorSubject<string>(undefined!);
  
  currentUser$ = this._currentUser.asObservable();
  currentRole$ = this._currentRole.asObservable();

  currentId$ = this.currentUser$.pipe(map(user => user.uid));
  isLogged$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private auth: Auth, private router: Router, private db: Database, private notifService: NotificationService, private userService: UserService) { 
    this.authStateListener();
  }

  authStateListener() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this._currentUser.next(user);
        this.userService.getUserRole$(user.uid).subscribe(role => {
          this._currentRole.next(role);
        })
      } 
      else {
        this._currentUser.next(undefined!);
        this._currentRole.next(undefined!);
      }
    });
  }

  
  register(userData: {username: string, email: string, password: string, repeatPassword: string}): void {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(userCredential => {
      const user = userCredential.user;
      const avatarUrl = '/assets/avatar.jpg';
      updateProfile(user, {displayName: userData.username, photoURL: avatarUrl});
      set(ref(this.db, 'users/' + user.uid), {
        _id: user.uid,
        avatar: avatarUrl,
        username: userData.username,
        reviews: [],
        role: "user"
      })
    })
    .then(() => {
      processSuccess("Successfully created an account!", this.notifService);
      this.router.navigate(["/home"]);
    })
    .catch(err => {
      processError(err, this.notifService);
    })
  }


  login(userData: {email: string, password: string}): void {
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(() => {
      processSuccess("Welcome back!", this.notifService);
      this.router.navigate(["/home"]);
    })
    .catch(err => {
      processError(err, this.notifService);
    })
  }


  logout(): void {
    signOut(this.auth)
    .then(() => {
      processSuccess("We hope to see you again!", this.notifService);
      this.router.navigate(["/user/login"]);
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }


  editProfile(username: string, avatar: string) {
    this.currentUser$.subscribe(user => {
      updateProfile(user, {displayName: username, photoURL: avatar})
      .then(() => {
        processSuccess("Successfully updated your account!", this.notifService);
      })
      .catch(err => {
        processError(err, this.notifService);
      });
    })
  }

  changeCredentials(newEmail: string, oldPassword: string, newPassword: string) {
    const currentEmail = this.auth.currentUser?.email;
    signOut(this.auth)
    .then(() => {
      signInWithEmailAndPassword(this.auth, currentEmail!, oldPassword)
      .then(userCredentials => {

        if (!!newEmail){
          updateEmail(userCredentials.user, newEmail)
          .catch(err => {
            processError(err, this.notifService);
          });
        }
        
        if (!!newPassword){
          updatePassword(userCredentials.user, newPassword)
          .catch(err => {
            processError(err, this.notifService);
          });
        }

      })
      .then(() => {
        const whatToNotify = !!newEmail && !!newPassword ? "credentials!" : (!!newEmail ? "email!" : "password!");
        processSuccess("Successfully updated your " + whatToNotify, this.notifService);
      })
      .catch(err => {
        processError(err, this.notifService);
      });
    })
  }
}
