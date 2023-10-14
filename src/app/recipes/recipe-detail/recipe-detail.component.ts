import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recip.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'  
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}
  
  ngOnInit(): void {    
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+(params['id']))      
    })    
  }

  OnAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
