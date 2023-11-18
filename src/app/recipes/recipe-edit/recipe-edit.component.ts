import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  public constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']

        if(this.id >= 0) {
          this.editMode = true
          this.recipe = this.recipeService.getRecipe(this.id)
        }

        this.initform()

      }
    );    
  }

  private initform() {
    let ingredientsFormArray = new FormArray([])    

    if(this.editMode) {
      for(let ingredient of this.recipe?.ingredients) 
        ingredientsFormArray.push(
          this.getNewIngredientFormGroup(ingredient.name, ingredient.amount)
        )
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe?.name, Validators.required),
      imagePath: new FormControl(this.recipe?.imagePath, Validators.required),
      description: new FormControl(this.recipe?.description, Validators.required),
      ingredients: ingredientsFormArray
    })
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipe.id, 
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'] )
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value) // if form elements'name match with the name of the model properties
      // this.editMode = false;
      // this.recipe = null
      // this.recipeForm.reset()
    }
    else {
      this.recipe = this.recipeService.addRecipe(this.recipeForm.value)
      console.log(this.recipe)
    }

    this.onCancel()

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  getIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  addIngredient() {      

    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.getNewIngredientFormGroup())    
    
  }

  onDeleteIngredient(index: number) {
    const ingredientFormGroup: FormArray = this.recipeForm.get('ingredients') as FormArray
    ingredientFormGroup.removeAt(index)
  }

  private getNewIngredientFormGroup(name: string = null, amount: number = null): FormGroup {
    return new FormGroup({
          name: new FormControl(name, Validators.required),
          amount: new FormControl(amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]),
        })
  }  

}
