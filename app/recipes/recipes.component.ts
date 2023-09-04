import { Component } from '@angular/core';
import { Recipe } from './recip.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

  recipe: Recipe

  OnRecipeSelected(recipe: Recipe) {
    this.recipe = recipe    
  }

}
