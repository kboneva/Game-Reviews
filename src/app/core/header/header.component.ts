import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.loggedIn); // TODO header loads before Auth
  }

  get loggedIn(): boolean {
    return this.authService.isLogged;
  }

  logout(): void {
    this.authService.logout();
  }
}
