import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}


@Injectable({providedIn: 'root'})
export class AuthService {
    fireBaseApiKey = 'AIzaSyDMf4XIETY1Zh3qb9dtZ9Rav0oiN07Js6E'
    signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.fireBaseApiKey}`

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signupUrl, {
            email: email,
            password: password,
            returnSecureToke: true
        })
    }

}