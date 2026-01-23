import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-view-recipe',
  imports: [Footer,Header,RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  relatedRecipes:any  = signal([])
  recipe:any = signal({})
  api = inject(ApiService)
  activateRoute = inject(ActivatedRoute)
  recipeId:string = this.activateRoute.snapshot.params['id']

  ngOnInit(){
    this.getRecipe()
  }

  getRecipe(){
    this.api.viewRecipeAPI(this.recipeId).subscribe((res:any)=>{
      this.recipe.set(res)
      // console.log(this.recipe());
      // call get related recipe api
      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.getRelatedRecipesAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.relatedRecipes.set(res.filter((item:any)=>item.name!=this.recipe().name))
      }else{
        this.relatedRecipes.set([])
      }
      console.log(this.relatedRecipes());
    })
  }

}
