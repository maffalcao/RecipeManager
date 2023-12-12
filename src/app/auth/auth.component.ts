import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true
  isLoading = false;

  constructor(private authService: AuthService) {}
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {   
    if(!form.valid) return

    if(this.isLoginMode) {
      
    }
    else {
      this.isLoading = true
      this.authService
        .signup(form.value.email, form.value.password)
        .subscribe(
        {
            next: (response) => {
              console.log(response)
              setInterval(() => {                
                this.isLoading = false
              }, 2000)              
            },
            error: (error) => {
              console.log(error)
              this.isLoading = false
            }            
        })
    }        
  }  
}
