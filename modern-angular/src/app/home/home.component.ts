import { AfterViewInit, Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ContainerComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <h2>You are home!</h2>
    <a routerLink="/post/20" [info]="linkInfo">Go to Post 20</a>

    <button (click)="goPost()">Go to Post 20</button>

    <app-container></app-container>

  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('linkEL') linkEl: any;

  router = inject(Router);

  linkInfo = {name: 'Yoda', age: 900};

  goPost() {
    this.router.navigateByUrl('/post/20', { info: 'This is a navigation info'});
  }

  ngAfterViewInit(): void {
    console.log('boo', this.linkEl);
    this.linkEl = 'This is pretty cool';
  }
}
