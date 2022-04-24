import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { IGame, IUser } from 'src/app/core/interfaces';
import { ReviewService } from 'src/app/core/services/review.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editing: boolean = false;
  currentUser!: IUser;

  defaultAvatar = '/assets/avatar.jpg';

  profileForm: FormGroup = this.formBuilder.group({
    "username": [null, { validators: [Validators.maxLength(50)], updateOn: 'change'}],
    "avatar": [null, {}]
  })

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private reviewService: ReviewService) { }


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
  }

  editProfileToggle() {
    this.editing = !this.editing;
    if (this.editing)
    {
      this.profileForm.patchValue({
        "username": this.currentUser.username,
        "avatar": this.currentUser.avatar
      })
    }
  }

  updateProfile(){
    const username = this.profileForm.value.username;
    const avatar = this.profileForm.value.avatar ? this.profileForm.value.avatar : '/assets/avatar.jpg';
    this.userService.updateProfile$(this.currentUser._id, username, avatar)
    .then(() => {
      this.authService.editProfile(username, avatar)
      this.editing = false;
      this.ngOnInit();
    })
  }

  deleteReview(data: {reviewId: string, reviewRating: number, game: IGame}): void {
    this.reviewService.deleteReview$(data.reviewId, data.reviewRating, this.currentUser._id, data.game)
    .then(() => {
      this.ngOnInit();
    })
  }
  
  showError(property: string): boolean {
    return this.profileForm.controls[property].invalid && this.profileForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.profileForm.controls[property].errors?.[validator];
  }
}
