import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  currentUser!: IUser;

  ngOnInit(): void {
    this.authService.currentId$.subscribe(id => {
      const currentUserId = id;
      if (!!currentUserId) {
        this.userService.loadUser$(currentUserId).subscribe(user => {
        this.currentUser = user;
        if (!!user.reviews){
          this.currentUser.reviews = Object.keys(user.reviews);
        }
        });
      }
    })

    // TODO edit profile: change username and pfp, change email and password(?), 
  }

}
