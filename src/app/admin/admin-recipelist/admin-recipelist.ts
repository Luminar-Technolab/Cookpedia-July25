import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-recipelist',
  standalone: false,
  templateUrl: './admin-recipelist.html',
  styleUrl: './admin-recipelist.css',
})
export class AdminRecipelist {

  api = inject(ApiService)
  allRecipes:any = signal([])
  searchKey:string = ""

  ngOnInit(){
    this.getRecipes()
  }

  getRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes.set(res)
      console.log(this.allRecipes());      
    })
  }

  deleteRecipe(id:string){
    this.api.removeRecipeAPI(id).subscribe((res:any)=>{
      alert(res)
      this.getRecipes()
    })
  }

}
