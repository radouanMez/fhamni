import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../../features/auth/auth.service';
import { User } from '../../../../features/auth/user.model';

@Component({
  selector: 'app-sidbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidbar.html',
  styleUrl: './sidbar.css', 
  encapsulation: ViewEncapsulation.Emulated
})
export class Sidbar implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/auth/login']);
  }


}
