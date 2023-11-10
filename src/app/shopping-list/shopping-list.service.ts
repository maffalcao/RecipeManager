import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<number>()

    private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ]

    getIngredients() {
      return this.ingredients.slice()
    }

    getIngredient(index: number) {
      return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient) {        
        this.ingredients.push(ingredient)
        this.onIngredientsChanged()
    }

    addIngredients(ingredients: Ingredient[]) {        
        this.ingredients.push(...ingredients)
        this.onIngredientsChanged()
    }
    
    updateIngredient(index: number, updatedIngredient: Ingredient) {
      this.ingredients[index] = updatedIngredient
      this.onIngredientsChanged()
    }

    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1)
      console.log(this.getIngredients())
      this.onIngredientsChanged()
    }

    private onIngredientsChanged() {
      this.ingredientsChanged.next(this.getIngredients())
    }
}