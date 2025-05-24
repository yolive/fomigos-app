import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/feed', pathMatch: 'full'},
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'feed',
    loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-post',
    loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent),
    canActivate: [AuthGuard]
  }
];
