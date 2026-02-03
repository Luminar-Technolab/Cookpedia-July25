import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-admin-manage-recipe',
  standalone: false,
  templateUrl: './admin-manage-recipe.html',
  styleUrl: './admin-manage-recipe.css',
})
export class AdminManageRecipe {

  route = inject(ActivatedRoute)
  recipeId:string = this.route.snapshot.params['id']
  recipeDetails:RecipeModel={}
  ingredientArray:any = []
  instructionArray:any = []
  mealTypeArray:any = []

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredientArray.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }
  removeIngredient(value:string){
    this.ingredientArray = this.ingredientArray.filter((item:string)=>item!=value)
  }

  addInstruction(instructionInput:any){
    if(instructionInput.value){
      this.instructionArray.push(instructionInput.value)
      instructionInput.value = ""
    }
  }
  removeInstruction(value:string){
    this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
  }

   addMeal(mealInput:any){
    if(mealInput.value){
      this.mealTypeArray.push(mealInput.value)
      mealInput.value = ""
    }
  }
  removeMeal(value:string){
    this.mealTypeArray = this.mealTypeArray.filter((item:string)=>item!=value)
  }


}
