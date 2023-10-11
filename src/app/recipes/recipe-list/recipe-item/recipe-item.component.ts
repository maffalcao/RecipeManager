import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recip.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'  
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;  
}
