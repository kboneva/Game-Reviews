import { RouterModule, Routes } from '@angular/router';
import { AllGamesPageComponent } from './all-games-page/all-games-page.component';
import { GamePageComponent } from './game-page/game-page.component';

const routes: Routes = [
  {
      path: 'catalog',
      component: AllGamesPageComponent
  },
  {
      path: 'game/:uid',
      component: GamePageComponent
  }
];

export const GamesRoutingModule = RouterModule.forChild(routes);
