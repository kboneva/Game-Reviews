import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { checkPasswords } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  passwordControl = new FormControl(null, { validators: [Validators.required, Validators.minLength(5)], updateOn: 'change'});
  repeatPasswordControl = new FormControl(null, { validators: [Validators.required, checkPasswords(this.passwordControl)], updateOn: 'change'});

  registerForm: FormGroup = this.formBuilder.group({
    "username": [null, { validators: [Validators.required, Validators.minLength(3)], updateOn: 'change'}],
    "email": [null, { validators: [Validators.required, Validators.email], updateOn: 'change'}],
    "password": this.passwordControl,
    "repeatPassword": this.repeatPasswordControl
  })

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.registerForm.value)
  }

  showError(property: string): boolean {
    return this.registerForm.controls[property].invalid && this.registerForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.registerForm.controls[property].errors?.[validator];
  }
}
