import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
