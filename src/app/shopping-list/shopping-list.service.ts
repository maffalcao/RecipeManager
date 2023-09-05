import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredients: Ingredient[] = []

    addIngredients(ingredient: Ingredient) {        
        this.ingredients.push(ingredient);
  }
}