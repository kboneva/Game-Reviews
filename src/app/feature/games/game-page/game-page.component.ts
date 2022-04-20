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
  addReviewShow: boolean = false;
  inEditMode: boolean = false;

  isLogged$ = this.authService.isLogged$

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private authService: AuthService, private reviewService: ReviewService) { }

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

  submitReview(data: {rating: number, text: string, gameId: string, userId: string}): void {
    const formData = {rating: data.rating, text: data.text};
    this.reviewService.submitReview$(formData, data.gameId, data.userId)
    .then(() => {
      this.ngOnInit();
    });
  }

  deleteReview(data: {reviewId: string, userId: string, gameId: string}): void {
    this.reviewService.deleteReview$(data.reviewId, data.userId, data.gameId)
    .then(() => {
      this.ngOnInit();
    })
  }

  addReviewToggle(): void {
    this.addReviewShow = !this.addReviewShow;
  }
}
