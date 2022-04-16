import { Component, Input, OnInit } from '@angular/core';
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
  review!: IReview;
  user!: IUser;
  game!: IGame;

  constructor(private reviewService: ReviewService, private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    {
      this.reviewService.loadReviewById$(this.reviewId).subscribe(review => {
        this.review = review;
        this.userService.loadUser$(this.review.userId).subscribe(user => {
          this.user = user;
          this.gameService.loadGameById(this.review.gameId).subscribe(game => {
            this.game = game;
          })
        })
      });
    }
  }
}
