import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { Content } from './pages/content/content';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutingModule,
    Content
  ] 
})
export class ContentModule {}