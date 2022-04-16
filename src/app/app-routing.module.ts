import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module')
    .then(m => m.MyAuthModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./feature/games/games.module')
    .then(m => m.GamesModule)
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
