import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContainerComponent } from '../container/container.component';
import { MyformComponent } from '../myform/myform.component';
import { DecimalPipe } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { Service1 } from '../service1';
import { CoolDirectiveDirective } from '../cool-directive.directive';
import { SeeMoreComponent } from '../see-more/see-more.component';
import { SeeMoreDirective } from '../see-more.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    MyformComponent,
    DecimalPipe,
    MessageComponent,
    CoolDirectiveDirective,
    SeeMoreComponent,
    SeeMoreDirective,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div appCoolDirective>Hello Dynamic Directive</div>
    <h2>You are home! {{ myname }}</h2>
    <h3>{{ num | number }}</h3>
    <a routerLink="/post/20" [info]="linkInfo">Go to Post 20</a>

    <button (click)="goPost()">Go to Post 20</button>

    <app-container></app-container>

    <app-myform modelName="fred"></app-myform>

    <hr />
    <button (click)="addComponent()">Add Component</button>

    <ng-container #placeholder></ng-container>
    <hr />
    Scott is here
    <app-see-more text="1234567890123456" [limit]="10"></app-see-more>
    <span seeMore>1234567890123456789012345678901234567890</span>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('linkEL') linkEl: any;

  router = inject(Router);

  num = 100;

  linkInfo = { name: 'Yoda', age: 900 };

  placeholder = viewChild('placeholder', { read: ViewContainerRef });

  myname: string = '';

  constructor(private service1: Service1) {
    this.myname = service1.getName();
  }

  goPost() {
    this.router.navigateByUrl('/post/20', {
      info: 'This is a navigation info',
    });
  }

  ngAfterViewInit(): void {
    console.log('boo', this.linkEl);
    this.linkEl = 'This is pretty cool';
  }

  addComponent() {
    const ref = this.placeholder()?.createComponent(MessageComponent);
    ref?.setInput('message', 'This is a message');
  }
}
