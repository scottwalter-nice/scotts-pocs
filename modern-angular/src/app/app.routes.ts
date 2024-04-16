import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'signalstore',
    loadComponent: () =>
      import('./signal-store/signal-store.component').then(
        (mod) => mod.SignalStoreComponent,
      ),
  },
  {
    path: 'myform',
    loadComponent: () =>
      import('./myform/myform.component').then((mod) => mod.MyformComponent),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs/tabs.component').then((mod) => mod.TabsComponent),
  },
  {
    path: 'dynamic',
    loadComponent: () =>
      import('./dynamic/dynamic.component').then((mod) => mod.DynamicComponent),
  },
  {
    path: 'conversation',
    loadComponent: () =>
      import('./conversation-container/conversation-container.component').then((mod) => mod.ConversationContainerComponent),
  },
  {
    path: 'conversation2',
    loadComponent: () =>
      import('./conversation-container2/conversation-container2.component').then((mod) => mod.ConversationContainer2Component),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
