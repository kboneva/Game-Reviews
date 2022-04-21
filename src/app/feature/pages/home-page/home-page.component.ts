import { Component, OnInit } from '@angular/core';
import { IReview } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  highest?: IReview[];
  lowest?: IReview[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

      // TODO top 3 highest rated games, top 3 lowest rated games ASIDE
}
