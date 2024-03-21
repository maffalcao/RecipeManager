import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'  
})
export class HeaderComponent implements OnInit, OnDestroy {  
  isAuthenticate = false
  private userSubject: Subscription
  
  
  constructor(
    private dataStorageService: DataStorageService, 
    private recipeService: RecipeService,
    private authService: AuthService) {}
  
  
  ngOnInit(): void {
    //this.dataStorageService.fetchRecipes().subscribe()

    this.userSubject = this.authService.userSubject.subscribe(user => {
      this.isAuthenticate = !!user
    })
  }

  onSaveData() {    
    this.dataStorageService.storeRecipes()
  }

  onFechData() {
    if(this.recipeService.getRecipes().length === 0)
      this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy(): void {
    this.userSubject.unsubscribe()
  }

}
