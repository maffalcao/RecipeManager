import { AuthService } from './../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from '../recipes/recip.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class DataStorageService {
    token: string
    recipesUrl = "https://ng-recipe-book-a24a8-default-rtdb.firebaseio.com/recipes.json"
    
    public constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}   
    

    storeRecipes()  {        
        const recipes = this.recipeService.getRecipes();

        this.http.put(this.recipesUrl, recipes).subscribe(response => {
            console.log(response)
        })
    }

    fetchRecipes() {
        this.authService.userSubject.pipe(take(1)).subscribe(user => {
            
        })

        return this.http
            .get<Recipe[]>(this.recipesUrl)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: [] }
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                })
            )
    }
}