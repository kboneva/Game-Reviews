import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private auth: Auth, private router: Router) { }

  // TODO profile stuff
}
