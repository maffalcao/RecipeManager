import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true
  isLoading = false  
  private closeSub: Subscription;
  
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

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
              this.isLoading = false
              this.showErrorAlert(errorMessage)
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
              this.isLoading = false
              this.showErrorAlert(errorMessage)
            }            
        })
    }        
  }

  // onHangleError() {
  //   this.error = null;
  // }

  private showErrorAlert(errorMessage: string) {     
    const componentRef = this.alertHost.viewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = errorMessage;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      
        this.closeSub.unsubscribe();
        this.alertHost.viewContainerRef.clear()
        
    })    
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
  }
}
