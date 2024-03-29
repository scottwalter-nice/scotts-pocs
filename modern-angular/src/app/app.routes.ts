import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'signalstore',
    loadComponent: () => import('./signal-store/signal-store.component').then(mod => mod.SignalStoreComponent)
  },
  {
    path: 'myform',
    loadComponent: () => import('./myform/myform.component').then(mod => mod.MyformComponent)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.component').then(mod => mod.TabsComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
