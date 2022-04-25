import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-all-games-page',
  templateUrl: './all-games-page.component.html',
  styleUrls: ['./all-games-page.component.css']
})
export class AllGamesPageComponent implements OnInit {

  gamesList!: IGame[];
  
  page = 0;
  pageSize = 4;
  collectionSize!: number;  

  currentRole$ = this.authService.currentRole$

  constructor(private gameServices: GameService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.gameServices.loadGames$().subscribe(gamesList => {
      const games = Object.values(gamesList);
      this.gamesList = this.sortByDate(games);
    }) 
  }

  sortByDate(games: IGame[]){
    return games.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }

  sortByRating(games: IGame[]){
    return games.sort((a, b) => b.average - a.average);
  }

  addGame(): void{
    this.router.navigate(['/games/submit']);
  }
}
