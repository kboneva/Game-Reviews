import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-add-game-page',
  templateUrl: './add-game-page.component.html',
  styleUrls: ['./add-game-page.component.css']
})
export class AddGamePageComponent implements OnInit {

  gameForm: FormGroup = this.formBuilder.group({
    "title": [null, { validators: [Validators.required], updateOn: 'change'}],
    "description": [null, { validators: [Validators.required], updateOn: 'change'}],
    "developer": [null, { validators: [Validators.required], updateOn: 'change'}],
    "genre": [null, { validators: [Validators.required, Validators.pattern(/[a-zA-Z0-9- ]+(, [a-zA-Z0-9- ]+)*/)], updateOn: 'change'}],
    "releaseDate": [null, { validators: [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)], updateOn: 'change'}],
    "image": [null, {validators: [Validators.required], updateOn: 'change'}]
  })

  constructor(private gameService: GameService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  addGame(): void {
    this.gameService.addGame$(this.gameForm.value)
    .then(() => {
      this.router.navigate(['/games/catalog']);
    })
  }

  showError(property: string): boolean {
    return this.gameForm.controls[property].invalid && this.gameForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.gameForm.controls[property].errors?.[validator];
  }
}
