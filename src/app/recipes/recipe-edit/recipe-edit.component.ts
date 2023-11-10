import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recip.model';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup
  recipe: Recipe
  id: number;
  editMode: boolean = false

  public constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']

        if(this.id != null) {
          this.editMode = true
          this.recipe = this.recipeService.getRecipe(this.id)
        }

        this.initform()

      }
    );    
  }

  private initform() {
    let ingredientsFormArray = new FormArray([])    

    for(let ingredient of this.recipe?.ingredients) 
      ingredientsFormArray.push(
        new FormGroup({
          name: new FormControl(ingredient.name),
          amount: new FormControl(ingredient.amount),
        })
      )

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe?.name, Validators.required),
      imagePath: new FormControl(this.recipe?.imagePath, Validators.required),
      description: new FormControl(this.recipe?.description, Validators.required),
      ingredients: ingredientsFormArray
    })
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  getIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  addIngredient() {   
    (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required)
    }))
  }

}
