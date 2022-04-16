import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { GameService } from './services/game.service';
import { ReviewService } from './services/review.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    UserService,
    AuthService,
    GameService,
    ReviewService
    ]
})
export class CoreModule { }
