import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  @Input() gameId!: string;
  userId!: string;
  errorMessage: string = '';
  rating = 5;
  @Output() addItem: EventEmitter<any> = new EventEmitter();

  reviewForm: FormGroup = this.formBuilder.group({
    "rating": [5, { validators: [Validators.required, Validators.max(10)], updateOn: 'change'}],
    "text": [null, { validators: [Validators.maxLength(500)], updateOn: 'change'}]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentId$.subscribe(id => this.userId = id);
  }

  submit(): void {
    const data = {rating: this.reviewForm.value.rating, text: this.reviewForm.value.text, gameId: this.gameId, userId: this.userId}
    this.addItem.emit(data);
  }

  showError(property: string): boolean {
    return this.reviewForm.controls[property].invalid && this.reviewForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.reviewForm.controls[property].errors?.[validator];
  }
}
