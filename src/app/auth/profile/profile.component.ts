import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { ReviewService } from 'src/app/core/services/review.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editingProfile: boolean = false;
  changingCredentials: boolean = false;
  currentUser!: IUser;

  page = 0;
  pageSize = 4;
  collectionSize!: number;

  defaultAvatar = '/assets/avatar.jpg';

  profileForm: FormGroup = this.formBuilder.group({
    "username": [null, { validators: [Validators.maxLength(50)], updateOn: 'change'}],
    "avatar": [null, {}]
  })

  userForm: FormGroup = this.formBuilder.group({
    "email": [null, { validators: [Validators.email], updateOn: 'change'}],
    "oldPassword": [null, { validators: [Validators.minLength(5), Validators.required], updateOn: 'change'}],
    "newPassword": [null, { validators: [Validators.minLength(5)], updateOn: 'change'}]
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
    this.editingProfile = !this.editingProfile;
    if (this.editingProfile) {
      this.profileForm.patchValue({
        "username": this.currentUser.username,
        "avatar": this.currentUser.avatar
      })
    }
  }

  changeEmailorPasswordToggle() {
    this.changingCredentials = !this.changingCredentials;
  }

  async updateProfile$(): Promise<void>{
    const username = this.profileForm.value.username;
    const avatar = this.profileForm.value.avatar ? this.profileForm.value.avatar : '/assets/avatar.jpg';
    await this.userService.updateProfile$(this.currentUser._id, username, avatar)
    .then(() => {
      this.authService.editProfile(username, avatar)
      this.editingProfile = false;
      this.ngOnInit();
    })
  }

  async updateCredentials$(): Promise<void> {
    const email = this.userForm.value.email;
    const oldPassword = this.userForm.value.oldPassword;
    const newPassword = this.userForm.value.newPassword;
    if (!email && !newPassword) {
      console.log('returning')
      return;
    }
    this.authService.changeCredentials(email, oldPassword, newPassword);
    this.changeEmailorPasswordToggle();
    this.userForm.patchValue({
      email: "",
      oldPassword: "",
      newPassword: ""
    })
  }

  async deleteReview(data: {reviewId: string, gameId: string}): Promise<void> {
    await this.reviewService.deleteReview$(data.reviewId, data.gameId, this.currentUser._id)
    .then(() => {
      this.ngOnInit();
    })
  }
  
  showError(property: string, form: FormGroup): boolean {
    return form.controls[property].invalid && form.controls[property].touched;
  }

  validation(property: string, form: FormGroup, validator: string): boolean {
    return form.controls[property].errors?.[validator];
  }
}
