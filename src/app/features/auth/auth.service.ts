import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from "./user.model";

interface AuthResponseData {
    user: {
        id: number;
        email: string;
        fullname: string;
        username: string;
        phone_number: string | null;
        userType: string;
        isAccountVerified: boolean;
        avatar_url?: string | null;
    };
    accessToken: string;
    expireIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private logoutTimer: any;
    private apiUrl = 'http://localhost:5000/api/users/auth';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    public authReadySubject = new BehaviorSubject<boolean>(false);
    public authReady$ = this.authReadySubject.asObservable();

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        console.log('🏗 AuthService constructor - isBrowser:', this.isBrowser());
        this.initializeAuth();
    }

    private initializeAuth(): void {
        console.log('🚀 Initializing auth service...');

        if (this.isBrowser()) {
            // 🔥 تحقق بسيط من وجود توكن بدون autoLogin معقد
            const token = this.getToken();
            const userData = this.getUserData();

            console.log('🔍 Auth initialization check:', {
                hasToken: !!token,
                hasUserData: !!userData
            });

            if (token && userData) {
                // 🔥 إذا كان هناك توكن، نضع المستخدم في الحالة لكن بدون تحميل كامل
                try {
                    const userDataObj = JSON.parse(userData);
                    const user = new User(
                        userDataObj.email,
                        userDataObj.id,
                        token,
                        new Date(userDataObj._tokenExpirationDate),
                        userDataObj.userName,
                        userDataObj.fullName,
                        userDataObj.Phone
                    );

                    if (user.isTokenValid()) {
                        console.log('✅ Token is valid, setting current user');
                        this.currentUserSubject.next(user);
                    } else {
                        console.log('💀 Token expired, clearing data');
                        this.clearAuthData();
                    }
                } catch (error) {
                    console.error('🚨 Error parsing user data:', error);
                    this.clearAuthData();
                }
            } else {
                console.log('🔓 No valid auth data found');
                this.currentUserSubject.next(null);
            }
        }

        // 🔥 تحديد أن الخدمة جاهزة فوراً
        console.log('✅ Auth service ready');
        this.authReadySubject.next(true);
    }

    public isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    // 🔥 دوال localStorage المبسطة
    private getFromStorage(key: string): string | null {
        if (!this.isBrowser()) return null;
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('🚨 Error accessing localStorage:', error);
            return null;
        }
    }

    private setToStorage(key: string, value: string): void {
        if (!this.isBrowser()) return;
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error('🚨 Error setting localStorage:', error);
        }
    }

    private removeFromStorage(key: string): void {
        if (!this.isBrowser()) return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('🚨 Error removing from localStorage:', error);
        }
    }

    // 🔥 الحصول على بيانات المستخدم من localStorage
    private getUserData(): string | null {
        return this.getFromStorage('currentUser');
    }

    // دوال المصادقة الأساسية
    getToken(): string | null {
        return this.getFromStorage('token');
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        if (!this.isBrowser()) {
            return false;
        }

        const token = this.getToken();
        if (!token) {
            return false;
        }

        const userDataString = this.getUserData();
        if (!userDataString) {
            return false;
        }

        try {
            const userData = JSON.parse(userDataString);
            const expirationDate = new Date(userData._tokenExpirationDate);
            const isValid = new Date() < expirationDate;

            console.log('🔐 Auth check:', {
                hasToken: !!token,
                expirationDate: expirationDate,
                isValid: isValid
            });

            return isValid;
        } catch {
            return false;
        }
    }
    // دوال الـ API
    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.apiUrl}/login`, { email, password })
            .pipe(
                tap(response => {
                    console.log('✅ Login successful, handling authentication...');
                    if (response.accessToken && response.user) {
                        this.handleAuthentication(response);
                    }
                }),
                catchError(this.handleError.bind(this))
            );
    }

    register(email: string, password: string, fullname?: string, username?: string, phone?: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.apiUrl}/register`, {
            email, password, fullname, username, phone
        }).pipe(
            tap(response => {
                console.log('✅ Registration successful, handling authentication...');
                if (response.accessToken) {
                    this.handleAuthentication(response);
                }
            }),
            catchError(this.handleError.bind(this))
        );
    }

    private handleAuthentication(resData: AuthResponseData): void {
        console.log('🔐 Handling authentication...');

        const expireDuration = this.parseExpireIn(resData.expireIn);
        const expirationDate = new Date(new Date().getTime() + expireDuration);

        const user = new User(
            resData.user.email,
            resData.user.id.toString(),
            resData.accessToken,
            expirationDate,
            resData.user.username,
            resData.user.fullname,
            resData.user.phone_number
        );

        console.log('💾 Saving user to storage:', user.email);

        this.setToStorage('currentUser', JSON.stringify(user));
        this.setToStorage('token', resData.accessToken);
        this.currentUserSubject.next(user);

        console.log('⏰ Setting auto logout in:', expireDuration / 1000, 'seconds');
        this.autoLogout(expireDuration);
    }

    logout(): void {
        console.log('🚪 Logging out...');
        this.clearAuthData();
        this.currentUserSubject.next(null);

        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
    }

    private clearAuthData(): void {
        console.log('🧹 Clearing auth data');
        this.removeFromStorage('currentUser');
        this.removeFromStorage('token');
    }

    private autoLogout(expirationDuration: number): void {
        if (!this.isBrowser()) return;

        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }

        console.log('⏰ Auto logout scheduled in:', expirationDuration / 1000, 'seconds');

        this.logoutTimer = setTimeout(() => {
            console.log('🕒 Auto logout executing...');
            this.logout();
        }, expirationDuration);
    }

    private parseExpireIn(expireIn: string): number {
        if (!expireIn) {
            console.warn('⚠️ No expireIn provided, using default 1 hour');
            return 60 * 60 * 1000;
        }

        const match = expireIn.match(/^(\d+)([smhd])$/);
        if (!match) {
            return parseInt(expireIn) * 1000;
        }

        const value = parseInt(match[1]);
        const unit = match[2];

        switch (unit) {
            case 's': return value * 1000;
            case 'm': return value * 60 * 1000;
            case 'h': return value * 60 * 60 * 1000;
            case 'd': return value * 24 * 60 * 60 * 1000;
            default: return 60 * 60 * 1000;
        }
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.error('🚨 Auth API Error:', errorRes);

        let errorMessage = 'An unknown error occurred!';
        if (errorRes.error && errorRes.error.message) {
            errorMessage = errorRes.error.message;
        } else if (errorRes.status === 0) {
            errorMessage = 'Unable to connect to server. Please check your connection.';
        } else if (errorRes.status === 401) {
            errorMessage = 'Invalid email or password.';
        } else if (errorRes.status === 400) {
            errorMessage = 'Invalid request data.';
        }

        return throwError(() => new Error(errorMessage));
    }

}