import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.formBuilder.group({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required])
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login$(this.loginFormGroup.value);
    this.router.navigate(["/home"]);
  }
}
