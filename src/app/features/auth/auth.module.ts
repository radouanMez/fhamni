import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Login } from './pages/login/login';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    Login,
    CommonModule,
    RoutingModule,
    FormsModule
  ]
})
export class ContentModule {} 