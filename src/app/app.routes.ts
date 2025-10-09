import { Routes } from '@angular/router';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./features/main/routing.module').then(m => m.RoutingModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./features/student/routing.module').then(m => m.RoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/routing.module').then(m => m.RoutingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routing.module').then(m => m.RoutingModule)
  },
  {
    path: '',
    redirectTo: '/main', // 🔥 توجيه افتراضي
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFound
  }
];