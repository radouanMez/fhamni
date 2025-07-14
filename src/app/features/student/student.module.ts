import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Dashboard } from './pages/dashboard/dashboard';

@NgModule({
  declarations: [Dashboard],
  imports: [
    CommonModule,
    RoutingModule
  ] 
})
export class ContentModule {}