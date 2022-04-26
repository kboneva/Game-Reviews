import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  games!: IGame[];

  get highest() {
    return Object.values(this.games)
    .filter(g => g.average >= 5)
    .sort((g1, g2) => g2.average - g1.average)
    .slice(0, 5);
  }
  get lowest() {
    return Object.values(this.games)
    .filter(g => g.average > 0 && g.average < 5)
    .sort((g1, g2) => g1.average - g2.average)
    .slice(0, 3);
  }
  get latest() {
    return Object.values(this.games)
    .filter(g => (new Date().getTime() - new Date(g.releaseDate).getTime()) < 31556952000)
    .sort((g1, g2) => new Date(g2.releaseDate).getTime() - new Date(g1.releaseDate).getTime())
    .slice(0, 4);
  }
  get mostDiscussed() {
    return Object.values(this.games)
    .filter(g => !!g.reviews)
    .sort((g1, g2) => g1.reviews.length - g2.reviews.length)
    .slice(0, 3);
  }

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.loadGames$().subscribe(games => {
      this.games = games;
    })
  }
}
