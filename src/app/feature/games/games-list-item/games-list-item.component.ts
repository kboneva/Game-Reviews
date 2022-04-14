import { Component, Input, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';

@Component({
  selector: 'app-games-list-item',
  templateUrl: './games-list-item.component.html',
  styleUrls: ['./games-list-item.component.css']
})
export class GamesListItemComponent implements OnInit {

  @Input() game!: IGame;

  constructor() { }

  ngOnInit(): void {
  }

}
