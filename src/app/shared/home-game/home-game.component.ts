import { Component, Input, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrls: ['./home-game.component.css']
})
export class HomeGameComponent implements OnInit {
  @Input() game! : IGame;

  constructor() { }

  ngOnInit(): void {
  }

}
