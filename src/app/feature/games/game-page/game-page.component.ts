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

  page = 0;
  pageSize = 3;
  collectionSize!: number;

  isLogged$ = this.authService.isLogged$

  reviewForm: FormGroup = this.formBuilder.group({
    "rating": [this.rating, { validators: [Validators.required, Validators.max(10)], updateOn: 'change'}],
    "text": [this.text, { validators: [Validators.maxLength(500)], updateOn: 'change'}]
  })

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private authService: AuthService, private reviewService: ReviewService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.gameId = params['uid'];
      await this.gameService.gameListener(this.gameId);
      this.initialize();
    })
  }

  initialize(){
    this.gameService.loadGameById$(this.gameId).subscribe(async game => {
      this.game = game;
      if (!!game.reviews) {
        this.game.reviews = Object.keys(game.reviews);
      }
    })
  }

  submitReview(): void {
    const data = {rating: this.reviewForm.value.rating, text: this.reviewForm.value.text}
    this.authService.currentId$.subscribe(async id => {
      await this.reviewService.submitReview$(data, this.gameId, id)
      .then(() => {
        this.addReviewShow = false;
        this.reviewForm.patchValue({
          rating: 5,
          text: ''
        })
        this.initialize();
      });
    });
    
  }

  deleteReview(data: {reviewId: string, gameId: string}): void {
    this.authService.currentId$.subscribe(async id => {
      await this.reviewService.deleteReview$(data.reviewId, this.gameId, id)
      .then(() => {
        this.initialize();
    })
    });
  }

  updateAverage(){
    this.initialize();
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
