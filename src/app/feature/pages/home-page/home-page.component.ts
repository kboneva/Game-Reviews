import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  highest?: IGame[];
  lowest?: IGame[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.loadTopThree$(true).subscribe(games => {
      this.highest = games;
    })
    this.gameService.loadTopThree$(false).subscribe(games => {
      this.lowest = games;
    })
  }
}
