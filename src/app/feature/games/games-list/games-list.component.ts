import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  gamesList!: IGame[];

  constructor(private gameServices: GameService) { }

  ngOnInit(): void {
    this.gameServices.loadGames().subscribe(gamesList => {
      const keys = Object.keys(gamesList);
      const values = Object.values(gamesList);
      const items = [];
      for (let i = 0; i < keys.length; i++) {
        items[i] = {
          _id: keys[i],
          developer:values[i].developer,
          description: values[i].description,
          releaseDate: values[i].releaseDate,
          genre: values[i].genre, 
          reviews: values[i].reviews, 
          title: values[i].title
        }
      }
      this.gamesList = items;
    }) }

}
