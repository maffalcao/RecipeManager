import { RecipeService } from './../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'  
})
export class HeaderComponent implements OnInit {  
  
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onSaveData() {    
    this.dataStorageService.storeRecipes()
  }

  onFechData() {
    if(this.recipeService.getRecipes().length === 0)
      this.dataStorageService.fetchRecipes().subscribe()
  }

}
