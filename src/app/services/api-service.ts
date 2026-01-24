import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  server_url = "http://localhost:3000"
  http = inject(HttpClient)

  //api function -
  // 1. get all recips : called by home & recipes component
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }

  //register : called by register compoennet
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  //login : called by login compoennet
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //view Recipe : view COmpoenet when page open
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
  }
  //related-recipes?cuisine=Italian
  getRelatedRecipesAPI(cuisine:string){
     return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  ///downloads/:id api 
  addToDownloadAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
  }
}
