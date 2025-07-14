import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Home } from './pages/home/home';

@NgModule({
  declarations: [Home],
  imports: [
    CommonModule,
    RoutingModule
  ] 
})
export class ContentModule {}