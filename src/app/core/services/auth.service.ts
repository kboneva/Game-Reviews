import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isLogged() {
    return !!this.currentUser;
  }

  register$(userData: {username: string, email: string, password: string, repeatPassword: string}): void {
    // TODO validate
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(userCredential => {
      const user = userCredential.user;
      updateProfile(user, {displayName: userData.username});
    })
    .then(() => {
      this.router.navigate(["/home"]);
    });
  }

  login$(userData: {email: string, password: string}): void {
    // TODO validate
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(() => {
      this.router.navigate(["/home"]);
      // return;
    }) // TODO error handling
    // .catch((error) => {
    //   if(error.code == "auth/user-not-found"){
    //     return "No such user exists!";
    //   }
    //   else return "Something went wrong."
    // });
  }

  logout(): void {
    signOut(this.auth)
    .then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
