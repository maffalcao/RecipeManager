import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recip.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {    

    private recipes: Recipe[] = [
        new Recipe(
            1,
            'A test recipt', 
            'This is simply a test 1', 
            'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            2,
            'A test recipt', 
            'This is simply a test 2', 
            'https://bakeandcakegourmet.com.br/uploads/site/receitas/macarrao-com-sardinha-3-qdu2sdl2.jpg',
            [
                new Ingredient('Apple', 110),
                new Ingredient('Bananas', 1),
            ]
        )
    ]

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipe(id: number) {
        const server = this.recipes.find(
            (recipe) => {
                return recipe.id === id
            }           
        )

        return server
    }

    getRecipes() {
        return this.recipes.slice() // create and return a copy of recipes, to avoid pass its reference
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }
}