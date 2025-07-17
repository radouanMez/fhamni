import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidbar.html',
  styleUrl: './sidbar.css', 
  encapsulation: ViewEncapsulation.Emulated
})
export class Sidbar {

}
