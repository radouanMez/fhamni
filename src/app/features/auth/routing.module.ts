import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { LoadinSpinnerCompennt } from '../../shared/components/loading-spinner/loading-spinner';
import { RegisterComponent } from './pages/register/register';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LoadinSpinnerCompennt
  ],
  exports: [RouterModule]
})
export class RoutingModule {}


