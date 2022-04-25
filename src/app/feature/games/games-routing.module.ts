import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AddGamePageComponent } from './add-game-page/add-game-page.component';
import { AllGamesPageComponent } from './all-games-page/all-games-page.component';
import { GamePageComponent } from './game-page/game-page.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: AllGamesPageComponent
},
{
    path: 'submit',
    canActivate: [AdminGuard],
    component: AddGamePageComponent
},
{
    path: ':uid',
    component: GamePageComponent
}
];

export const GamesRoutingModule = RouterModule.forChild(routes);
