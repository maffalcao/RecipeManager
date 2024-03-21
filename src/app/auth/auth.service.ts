import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment.prod";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthService {
    userSubject = new BehaviorSubject<User>(null)        

    fireBaseApiKey = environment.firebaseAPIKey;
    signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.fireBaseApiKey}`
    signinUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.fireBaseApiKey}`

    constructor(private http: HttpClient) {
        this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    signup(email: string, password: string) {

        return this.http.post<AuthResponseData>(this.signupUrl, {
            email: email,
            password: password,
            returnSecureToke: true
        })
        .pipe(catchError(this.handleError), tap(this.handleAuthentication))
    }

    login(email: string, password: string) {

        return this.http.post<AuthResponseData>(this.signinUrl, {
            email: email,
            password: password,
            returnSecureToke: true
        })
        .pipe(catchError(this.handleError), tap(this.handleAuthentication))
    }

    private handleAuthentication(responseData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate)

        this.userSubject.next(user)
    }

    private handleError(errorResponse: HttpErrorResponse) {

        let errorMesssage = 'An unknown error occurred!'
        console.log(errorResponse)

        switch(errorResponse?.error?.error?.message) {
            case 'EMAIL_EXISTS':
                errorMesssage = 'This email exists already'
                break
            case 'EMAIL_NOT_FOUND':
                errorMesssage = 'This email does not exist'
                break
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMesssage = 'This credencials is not correct'
        }

        return throwError(errorMesssage)

    }

}