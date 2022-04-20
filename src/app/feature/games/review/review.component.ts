import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  review!: IReview;
  user!: IUser;
  game!: IGame;
  canDelete!: boolean;
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  

  constructor(private reviewService: ReviewService, private userService: UserService, private gameService: GameService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    {
      this.reviewService.loadReviewById$(this.reviewId).subscribe(review => {
        this.review = review;
        this.userService.loadUser$(this.review.userId).subscribe(user => {
          this.user = user;
          this.gameService.loadGameById$(this.review.gameId).subscribe(game => {
            this.game = game;
            this.authService.currentId$.subscribe(id => {
              if (id == this.user._id) {
                this.canDelete = true;
              }
            })
          })
        })
      });
    }
  }

  remove(): void {
    const data = {reviewId: this.reviewId, userId: this.review.userId, gameId: this.review.gameId}
    this.removeItem.emit(data);
  }
}
