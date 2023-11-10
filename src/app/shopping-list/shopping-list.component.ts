import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private ingChangeSubject: Subscription

  constructor(private shoppingListService: ShoppingListService) { }  
  
  ngOnInit(): void {    
    this.ingredients = this.shoppingListService.getIngredients();  
    this.ingChangeSubject = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
      )
    }

    
    onEditItem(index: number) {        
       this.shoppingListService.startedEditing.next(index)
    }

    ngOnDestroy(): void {
      this.ingChangeSubject.unsubscribe()
    }
  }
