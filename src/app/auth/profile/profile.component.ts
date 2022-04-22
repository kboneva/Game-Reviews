import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editing: boolean = false;
  currentUser!: IUser;

  profileForm: FormGroup = this.formBuilder.group({
    "username": [null, { validators: [Validators.maxLength(50)], updateOn: 'change'}],
    "avatar": [null, { validators: [Validators.maxLength(200)], updateOn: 'change'}] // TODO url validator?
  })

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder) { }



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
    this.userService.updateProfile$(this.currentUser._id, this.profileForm.value)
    .then(() => {
      this.editing = false;
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
