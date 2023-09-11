import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  games!: IGame[];
  gamesList!: IGame[];
  
  page = 0;
  pageSize = 5;
  collectionSize!: number;

  dropDownForm = new FormControl('');
  searchForm = new FormControl('');

  currentRole$ = this.authService.currentRole$

  constructor(private gameServices: GameService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.gameServices.loadGames$().subscribe(gamesList => {
      this.gamesList = Object.values(gamesList);
      this.games = this.gamesList;
      this.sortByDate();

      this.searchForm.valueChanges.subscribe(searchTerm => {
        searchTerm = searchTerm.toLowerCase()
        this.games = this.gamesList.filter(g => g.title.toLowerCase().includes(searchTerm) 
        || g.developer.toLowerCase().includes(searchTerm) 
        || g.description.toLowerCase().includes(searchTerm));
      })
    }) 
  }

  sortByDate(){
    this.games.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    this.gamesList.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }

  sortByRating(){
    this.games.sort((a, b) => b.average - a.average);
    this.gamesList.sort((a, b) => b.average - a.average);
  }

  sortByName(){
    this.games.sort((a, b) => a.title.localeCompare(b.title));
    this.gamesList.sort((a, b) => a.title.localeCompare(b.title));
  }

  addGame(): void{
    this.router.navigate(['/games/submit']);
  }
}
