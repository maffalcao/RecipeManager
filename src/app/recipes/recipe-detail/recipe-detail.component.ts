import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recip.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'  
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {}
  
  ngOnInit(): void {    
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+(params['id']))      
    })    
  }

  OnAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe.id)
    this.router.navigate(['/recipes'])
  }
}
