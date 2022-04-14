import { Component, Input, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game!: IGame;

  constructor() { }

  ngOnInit(): void {
  }

}
