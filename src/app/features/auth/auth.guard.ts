import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  canActivate(): boolean {
    // في الـ SSR، اسمح بالمرور دائماً
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    console.log('🔐 AuthGuard checking authentication...');

    const isAuthenticated = this.authService.isAuthenticated();
    console.log('📊 AuthGuard - Authentication status:', isAuthenticated);

    if (isAuthenticated) {
      console.log('✅ AuthGuard - Access granted');
      return true;
    } else {
      console.log('🚫 AuthGuard - Access denied, redirecting to login');
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return false;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}