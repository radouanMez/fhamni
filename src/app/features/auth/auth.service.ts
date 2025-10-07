import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponseData {
    user: User;
    accessToken: string;
    refreshToken: string;
    expireIn: string;
    localId: string;
    message?: string;
}

export interface User {
    id: string;
    email: string;
    fullname: string;
    accessToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private apiUrl                  = 'http://localhost:5000/api/users/auth';
    private currentUserSubject      = new BehaviorSubject<User | null>(null);
    public currentUser$             = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    private handleError(errorRes: HttpErrorResponse) {
        console.log('Error in service:', errorRes);

        let errorMessage = 'An unknown error occurred!';

        if (errorRes.error && errorRes.error.message) {
            errorMessage = errorRes.error.message;
        } else if (errorRes.error && typeof errorRes.error === 'string') {
            errorMessage = errorRes.error;
        } else if (errorRes.status === 400) {
            errorMessage = 'Bad request. Please check your data.';
        } else if (errorRes.status === 401) {
            errorMessage = 'Unauthorized. Please check your credentials.';
        } else if (errorRes.status === 409) {
            errorMessage = 'User already exists.';
        } else if (errorRes.status === 500) {
            errorMessage = 'Internal server error. Please try again later.';
        }

        return throwError(() => new Error(errorMessage));
    }

    register(email: string, password: string, fullname?: string, username?: string, phone?: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.apiUrl}/register`, {
            email, password, fullname, username, phone
        }).pipe(
            tap(response => {
                if (response.accessToken) {
                    this.setCurrentUser(response.user, response.accessToken);
                }
            }),
            catchError(this.handleError.bind(this))
        );
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.apiUrl}/login`, { email, password })
            .pipe(
                tap(response => {
                    console.log(response)
                    if (response.accessToken) {
                        this.setCurrentUser(response.user, response.accessToken);
                    }
                }),
                catchError(this.handleError.bind(this))
            );
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/forgot-password`, { email })
            .pipe(catchError(this.handleError.bind(this)));
    }

    resetPassword(token: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/reset-password`, { token, password })
            .pipe(catchError(this.handleError.bind(this)));
    }

    private setCurrentUser(user: User, token: string): void {
        user.accessToken = token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.currentUserSubject.next(user);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }


}