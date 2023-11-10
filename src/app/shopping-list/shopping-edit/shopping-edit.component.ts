import { Component, ElementRef, ViewChild, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {   
  @ViewChild('f') form: NgForm
  subscription: Subscription
  editMode = false;
  editedIndex: number
  
  constructor(private shoppingListService: ShoppingListService) {}
  
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedIndex = index
      this.editMode = true
      const ingredient = this.shoppingListService.getIngredient(index)

      this.form.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      })      
    })
  }
  
  onSubmit() {
    const value = this.form.value    
    const ingredient = new Ingredient(value.name, value.amount)

    if(this.editMode)
      this.shoppingListService.updateIngredient(this.editedIndex, ingredient)
    else
      this.shoppingListService.addIngredient(ingredient)

    this.onClear()
    
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndex)
    this.onClear()
  }

  onClear() {
    this.form.reset()
    this.editMode = false;
    this.editedIndex = null
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
