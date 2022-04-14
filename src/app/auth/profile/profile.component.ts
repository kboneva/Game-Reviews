import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Input() currentUser!: User;

  ngOnInit(): void {
    if (this.authService.currentUser !== null)
    {
      this.currentUser = this.authService.currentUser;
    }
  }

}
