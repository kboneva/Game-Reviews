import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { getDatabase, ref, set } from '@angular/fire/database';
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
      const db = getDatabase();
      set(ref(db, 'users/' + user.uid), {
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

  login$(userData: {email: string, password: string}): void {
    // TODO validate
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
    .then(result => {
      console.log(result.user)
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
      this.router.navigate(["/login"]);
    });
  }
}
