import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Login } from './pages/login/login';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [Login],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule
  ]
})
export class ContentModule {} 