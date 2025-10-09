import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: Login, 
    canActivate: [NoAuthGuard] // 🔥 منع المستخدمين المسجلين من الوصول لـ login
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [NoAuthGuard] // 🔥 منع المستخدمين المسجلين من الوصول لـ register
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' // 🔥 redirect افتراضي
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    // 🔥 إزالة LoadinSpinnerCompennt من هنا - ليس مكانه الصحيح
  ],
  exports: [RouterModule]
})
export class RoutingModule { }