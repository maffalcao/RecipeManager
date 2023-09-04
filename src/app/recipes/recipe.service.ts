import { EventEmitter } from "@angular/core";
import { Recipe } from "./recip.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>()

    private recipes: Recipe[] = [
        new Recipe('A test recipt', 'This is simply a test 1', 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.jpg'),
        new Recipe('A test recipt', 'This is simply a test 2', 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.jpg'),
        new Recipe('A test recipt', 'This is simply a test 3', 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/4e/7b/au-t2-e-5093-pancake-recipe-english_ver_5.jpg')
    ]

    getRecipes() {
        return this.recipes.slice() // create and return a copy of recipes, to avoid pass its reference
    }
}