import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Angular 17 Demos</h1>

    <h2>Navigations</h2>

    <ul>
      <li><a [routerLink]="'home'">Home</a></li>
      <li>
        <a
          [routerLink]="['/post/', '1']"
          [queryParams]="{ message: 'Hello World' }"
          >Posts</a
        >
      </li>
      <li><a [routerLink]="'signalstore'">Signal Store</a></li>
      <li><a [routerLink]="'myform'">My Form</a></li>
      <li><a [routerLink]="'tabs'">Tabs</a></li>
      <li><a [routerLink]="'dynamic'">Dynamic</a></li>
      <li><a [routerLink]="'conversation'">Let's have a conversation.  Shall you?</a></li>
      <li><a [routerLink]="'conversation2'">Let's have a conversation2.  Shall you?</a></li>
    </ul>

    <router-outlet />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
