import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  @Input() gameId!: string;
  errorMessage: string = '';
  rating = 5;

  reviewForm: FormGroup = this.formBuilder.group({
    "rating": [5, { validators: [Validators.required, Validators.max(10)], updateOn: 'change'}],
    "text": [null, { validators: [Validators.maxLength(500)], updateOn: 'change'}]
  })

  constructor(private formBuilder: FormBuilder, private reviewService: ReviewService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.reviewService.submitReview$(this.reviewForm.value, this.gameId);
  }

  showError(property: string): boolean {
    return this.reviewForm.controls[property].invalid && this.reviewForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.reviewForm.controls[property].errors?.[validator];
  }
}
