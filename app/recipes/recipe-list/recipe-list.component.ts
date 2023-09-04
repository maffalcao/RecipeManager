import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { Recipe } from '../recip.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeSelected = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe('A test recipt', 'This is simply a test 1', 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.jpg'),
    new Recipe('A test recipt', 'This is simply a test 2', 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.jpg'),
    new Recipe('A test recipt', 'This is simply a test 3', 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.jpg')
  ]
  
  onRecipeSelected(recipe: Recipe) {    
    this.recipeSelected.emit(recipe);
  }
}
