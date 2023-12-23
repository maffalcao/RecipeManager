import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true
  isLoading = false
  error:string = null

  constructor(private authService: AuthService, private rounter: Router) {}
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {   
    if(!form.valid) return

    this.isLoading = true
    if(this.isLoginMode) {
      this.authService
        .login(form.value.email, form.value.password)
        .subscribe(
        {
            next: (response) => {
              console.log(response)
              this.isLoading = false
              this.rounter.navigate([''])
            },
            error: (errorMessage) => {
              console.log(errorMessage)
              this.error = errorMessage             
              this.isLoading = false
            }            
        }) 
    }
    else {
      
      this.authService
        .signup(form.value.email, form.value.password)
        .subscribe(
        {
            next: (response) => {
              console.log(response)
              this.isLoading = false
              this.rounter.navigate([''])
            },
            error: (errorMessage) => {
              console.log(errorMessage)
              this.error = errorMessage                            
              this.isLoading = false
            }            
        })
    }        
  }  
}
