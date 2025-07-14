import { Routes } from '@angular/router';

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
    loadChildren: () => import('./features/auth/routing.module').then(m => m.RoutingModule)
  }
];