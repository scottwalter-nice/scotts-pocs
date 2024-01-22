import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h2>You are home!</h2>

  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
