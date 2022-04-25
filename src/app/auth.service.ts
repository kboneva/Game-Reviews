import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { processError } from './auth/utils';
import { NotificationService, NotificationType } from './core/services/notification.service';
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

  // TODO admin role, can add games !!

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

  editProfile(username: string, avatar: string) {
    this.currentUser$.subscribe(user => {
      updateProfile(user, {displayName: username, photoURL: avatar})
      .then(() => {
        this.notifService.notify({
          message:"Successfully updated your account!",
          type: NotificationType.Success
        })
      })
      .catch(err => {
        processError(err, this.notifService);
      });
    })
  }

  // changeEmail(email: string) {
  //   this.currentUser$.subscribe(user => {
  //     updateEmail(user, email);
  //   })
  // }
  // // TODO if time left: edit profile: change email and password(?)
  // changePassword(password: string) {
  //   this.currentUser$.subscribe(user => {
  //     updatePassword(user, password);
  //   })
  // }

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
      this.notifService.notify({
        message:"Successfully created an account!",
        type: NotificationType.Success
      })
      this.router.navigate(["/home"]);
    })
    .catch(err => {
      processError(err, this.notifService);
    })
  }


  login(userData: {email: string, password: string}): void {
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(() => {
      this.notifService.notify({
        message:"Welcome back!",
        type: NotificationType.Success
      })
      this.router.navigate(["/home"]);
    })
    .catch(err => {
      processError(err, this.notifService);
    })
  }


  logout(): void {
    signOut(this.auth)
    .then(() => {
      this.notifService.notify({
        message:"We hope to see you again!",
        type: NotificationType.Success
      })
      this.router.navigate(["/user/login"]);
    })
    .catch(err => {
      processError(err, this.notifService);
    });
  }
}
