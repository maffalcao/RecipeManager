import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recip.model';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    recipesUrl = "https://ng-recipe-book-a24a8-default-rtdb.firebaseio.com/recipes.json"
    public constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes()  {
        
        const recipes = this.recipeService.getRecipes();

        this.http.put(this.recipesUrl, recipes).subscribe(response => {
            console.log(response)
        })

    }

    fetchRecipes() {
       this.http.get<Recipe[]>(this.recipesUrl).subscribe(response => {
            console.log(response)
            this.recipeService.setRecipes(response)
        })
    }
}