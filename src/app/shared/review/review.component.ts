import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  canInteract!: boolean;
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  editing: boolean = false;
  

  constructor(private reviewService: ReviewService, private userService: UserService, private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    {
      this.reviewService.loadReviewById$(this.reviewId).subscribe(review => {
        this.review = review;
        this.review._id = this.reviewId;
        this.userService.loadUser$(this.review.userId).subscribe(user => {
          this.user = user;
          this.gameService.loadGameById$(this.review.gameId).subscribe(game => {
            this.game = game;
            this.authService.currentUser$.subscribe(user => {
              if (!!user && user._id == this.user._id) {
                this.canInteract = true;
              }
            })
          })
        })
      });
    }
  }
  
  toggleEditMode() {
    this.editing = !this.editing; // TODO make cancel button inside review component OR add the add-review component inside review component as a template.
  }

  updateReview(data: {reviewId: string, rating: number, text: string}){
    const formData = {rating: data.rating, text: data.text};
    this.reviewService.updateReview$(data.reviewId, formData)
    .then(() => {
      this.editing = false;
      this.ngOnInit();
    });
  }

  remove(): void {
    const data = {reviewId: this.reviewId, reviewRating: this.review.rating}
    this.removeItem.emit(data);
  }
}
