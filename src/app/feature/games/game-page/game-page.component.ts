import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/auth.service';
import { GameService } from 'src/app/core/services/game.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  gameId!: string;
  game!: IGame;
  addReviewShow: boolean = false;
  text = '';
  rating = 5;

  isLogged$ = this.authService.isLogged$

  reviewForm: FormGroup = this.formBuilder.group({
    "rating": [this.rating, { validators: [Validators.required, Validators.max(10)], updateOn: 'change'}],
    "text": [this.text, { validators: [Validators.maxLength(500)], updateOn: 'change'}]
  })

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private authService: AuthService, private reviewService: ReviewService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['uid'];
      this.gameService.loadGameById$(this.gameId).subscribe(game => {
        this.game = game;
        if (!!game.reviews){
          this.game.reviews = Object.keys(game.reviews);
        }
      })
    })
  }

  submitReview(): void {
    const data = {rating: this.reviewForm.value.rating, text: this.reviewForm.value.text}
    this.authService.currentId$.subscribe(id => {
      this.reviewService.submitReview$(data, this.game, id)
      .then(() => {
        this.addReviewShow = false;
        this.ngOnInit();
      });
    });
    
  }

  deleteReview(data: {reviewId: string, reviewRating: number}): void {
    this.authService.currentId$.subscribe(id => {
      this.reviewService.deleteReview$(data.reviewId, data.reviewRating, id, this.game)
      .then(() => {
        this.ngOnInit();
    })
    });
    
  }

  addReviewToggle(): void {
    this.addReviewShow = !this.addReviewShow;
  }

  validation(property: string, validator: string): boolean {
    return this.reviewForm.controls[property].errors?.[validator];
  }

  showError(property: string): boolean {
    return this.reviewForm.controls[property].invalid && this.reviewForm.controls[property].touched;
  }
}
