import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Content } from './pages/content/content';

@NgModule({
  declarations: [Content],
  imports: [
    CommonModule,
    RoutingModule
  ] 
})
export class ContentModule {}