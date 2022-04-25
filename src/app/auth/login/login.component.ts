import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    "email": [null, { validators: [Validators.required, Validators.email], updateOn: 'change'}],
    "password": [null, { validators: [Validators.required, Validators.minLength(5)], updateOn: 'change'}]
  })

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.value)
  }

  showError(property: string): boolean {
    return this.loginForm.controls[property].invalid && this.loginForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.loginForm.controls[property].errors?.[validator];
  }
}
