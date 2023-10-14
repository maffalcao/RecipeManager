import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { Recipe } from '../recip.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'  
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  }

  addNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route})
  }

}
