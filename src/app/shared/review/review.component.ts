import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { IGame, IReview, IUser } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() reviewId!: string;
  @Input() displayGame = false;
  review!: IReview;
  user!: IUser;
  game!: IGame;
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  editing: boolean = false;

  text = '';
  rating = 5;

  currentId$ = this.authService.currentId$;

  reviewForm: FormGroup = this.formBuilder.group({
    "rating": [this.rating, { validators: [Validators.required, Validators.max(10)], updateOn: 'change'}],
    "text": [this.text, { validators: [Validators.maxLength(500)], updateOn: 'change'}]
  })

  constructor(private reviewService: ReviewService, private userService: UserService, private gameService: GameService, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    {
      this.reviewService.loadReviewById$(this.reviewId).subscribe(review => {
        this.review = review;
        this.userService.loadUser$(this.review.userId).subscribe(user => {
          this.user = user;
          this.gameService.loadGameById$(this.review.gameId).subscribe(game => {
            this.game = game;
            if (!!game.reviews){
              this.game.reviews = Object.keys(game.reviews);
            }
          })
        })
      });
    }
  }
  
  toggleEditMode() {
    this.editing = !this.editing;
    if (this.editing)
    {
      this.reviewForm.patchValue({
        "rating": this.review.rating,
        "text": this.review.text
      })
    }
  }

  updateReview(){
    const formData = {rating: this.reviewForm.value.rating, text: this.reviewForm.value.text};
    this.reviewService.updateReview$(this.review._id, formData, this.game, this.review.rating)
    .then(() => {
      this.editing = false;
      this.ngOnInit();
    });
  }

  remove(): void {
    const data = {reviewId: this.reviewId, reviewRating: this.review.rating, game: this.game}
    this.removeItem.emit(data);
  }

  showError(property: string): boolean {
    return this.reviewForm.controls[property].invalid && this.reviewForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.reviewForm.controls[property].errors?.[validator];
  }
}
