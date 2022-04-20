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

  @Input() gameId!: string;
  userId!: string;
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
    this.authService.currentId$.subscribe(id => this.userId = id);
    if (!!this.currentReview)
    {
      this.reviewForm.patchValue({
        "rating": this.currentReview.rating,
        "text": this.currentReview.text
      })
    }
  }

  submit(): void {
    const data = {rating: this.reviewForm.value.rating, text: this.reviewForm.value.text, gameId: this.gameId, userId: this.userId}
    this.addItem.emit(data);
  }

  update(): void {
    const data = {reviewId: this.currentReview!._id, rating: this.reviewForm.value.rating, text: this.reviewForm.value.text};
    console.log("collect new data in form");
    console.log("emit to reviews");
    this.updateItem.emit(data);
  }

  showError(property: string): boolean {
    return this.reviewForm.controls[property].invalid && this.reviewForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.reviewForm.controls[property].errors?.[validator];
  }
}
