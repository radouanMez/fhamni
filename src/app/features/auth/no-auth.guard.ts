import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
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

    console.log('🔐 NoAuthGuard checking authentication...');

    const isAuthenticated = this.authService.isAuthenticated();
    console.log('📊 NoAuthGuard - User authenticated:', isAuthenticated);

    if (isAuthenticated) {
      console.log('🚫 NoAuthGuard - User is logged in, redirecting to /admin');
      this.router.navigate(['/admin']);
      return false;
    }

    console.log('✅ NoAuthGuard - User not logged in, allowing access');
    return true;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}