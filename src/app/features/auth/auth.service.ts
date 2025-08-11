import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    type: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string, fullname: string, username: string) {
        return this.http.post<AuthResponseData>('http://localhost:5000/api/users/auth/register', {
            email: email,
            password: password,
            fullname: fullname, 
            username: username,
        });
    }

}