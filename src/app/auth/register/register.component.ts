import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  registerForm: FormGroup = this.formBuilder.group({
    "username": [null, { validators: [Validators.required], updateOn: 'change'}],
    "email": [null, { validators: [Validators.required, Validators.email], updateOn: 'change'}],
    "password": [null, { validators: [Validators.required], updateOn: 'change'}],
    "repeatPassword": [null, { validators: [Validators.required], updateOn: 'change'}]
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
