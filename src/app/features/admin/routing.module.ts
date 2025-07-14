import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Content } from './pages/content/content';
import { Users } from './pages/users/users';

const routes: Routes = [
  { path: 'admin', component: Content },
  { path: 'admin/users', component: Users },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}