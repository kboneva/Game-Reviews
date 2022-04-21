import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/auth.service';
import { GameService } from 'src/app/core/services/game.service';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  gameId!: string;
  game!: IGame;
  userId!: string;
  addReviewShow: boolean = false;
  inEditMode: boolean = false;

  isLogged$ = this.authService.isLogged$

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private authService: AuthService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['uid'];
      this.gameService.loadGameById$(this.gameId).subscribe(game => {
        this.game = game;
        this.game._id = this.gameId;
        if (!!game.reviews){
          this.game.reviews = Object.keys(game.reviews);
          this.authService.currentId$.subscribe(id => this.userId = id);
        }
      })
    })
  }

  submitReview(data: {rating: number, text: string}): void {
    this.reviewService.submitReview$(data, this.game, this.userId)
    .then(() => {
      this.ngOnInit();
    });
  }

  deleteReview(data: {reviewId: string, reviewRating: number}): void {
    this.reviewService.deleteReview$(data.reviewId, data.reviewRating, this.userId, this.game)
    .then(() => {
      this.ngOnInit();
    })
  }

  addReviewToggle(): void {
    this.addReviewShow = !this.addReviewShow;
  }
}
