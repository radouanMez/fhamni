import { Routes } from '@angular/router';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/main/routing.module').then(m => m.RoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/student/routing.module').then(m => m.RoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/admin/routing.module').then(m => m.RoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/routing.module').then(m => m.RoutingModule)
  },
  {
    path: '**',
    component: NotFound
  }
];