import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { Admin } from './admin';
import { Content } from './pages/content/content';

const routes: Routes = [
  { 
    path: 'admin', 
    component: Admin,
    children: [
      { path: 'users', component: Users },
      { path: 'matier', component: Content },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {} 