import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { IReview } from 'src/app/core/interfaces';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {


  errorMessage = '';
  text = '';
  rating = 5;

  @Input() editing = false;
  @Input() currentReview? : IReview;

  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<any> = new EventEmitter();

  reviewForm: FormGroup = this.formBuilder.group({
    "rating": [this.rating, { validators: [Validators.required, Validators.max(10)], updateOn: 'change'}],
    "text": [this.text, { validators: [Validators.maxLength(500)], updateOn: 'change'}]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    if (!!this.currentReview)
    {
      this.reviewForm.patchValue({
        "rating": this.currentReview.rating,
        "text": this.currentReview.text
      })
    }
  }

  submit(): void {
    const data = {rating: this.reviewForm.value.rating, text: this.reviewForm.value.text}
    this.addItem.emit(data);
  }

  update(): void {
    const data = {reviewId: this.currentReview!._id, rating: this.reviewForm.value.rating, text: this.reviewForm.value.text};
    this.updateItem.emit(data);
  }

  showError(property: string): boolean {
    return this.reviewForm.controls[property].invalid && this.reviewForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.reviewForm.controls[property].errors?.[validator];
  }
}
