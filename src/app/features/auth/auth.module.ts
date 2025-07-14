import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Login } from './pages/login/login';

@NgModule({
  declarations: [Login],
  imports: [
    CommonModule,
    RoutingModule 
  ] 
})
export class ContentModule {} 