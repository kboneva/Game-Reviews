import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game!: IGame;

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const gameId = params['uid'];
      this.gameService.loadGameById(gameId).subscribe(game => {
        this.game = game;
      })
    })
  }

}
