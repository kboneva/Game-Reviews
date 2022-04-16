import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  currentUser$ = this.authService.currentUser$;
  isLogged$ = this.authService.isLogged$;

  ngOnInit(): void {
    // TODO header loads before Auth
  }

  logout(): void {
    if (this.isLogged$)
      this.authService.logout();
  }
}
