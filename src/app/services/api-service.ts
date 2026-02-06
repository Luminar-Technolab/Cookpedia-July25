import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  server_url = "https://cookpedia-server-july25.onrender.com"
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
  //http://localhost:3000/recipes/696dca88b9d0995b3d822937/save : post - called view recipe complnenr when save recipe btn clicked
  addToSaveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipes/${recipeId}/save`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipe-collection get rqst from user collection compoenent when page load
  getUserSaveRecipesAPI(){
     return this.http.get(`${this.server_url}/recipe-collection`,this.appendToken())
  }

  //http://localhost:3000/recipe-collection/69785458cae7be8b48c626ce - delete from save recipe component when delete btn clicked
  removeUserSaveRecipeItemAPI(recipeId:string){
     return this.http.delete(`${this.server_url}/recipe-collection/${recipeId}`,this.appendToken())
  }

  //http://localhost:3000/feedback : post by contact component when submit btn clicked
  addFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedback`,reqBody)
  }

  //http://localhost:3000/user-downloads : get by user profile component when page loads
  getUserDownloadListAPI(){
     return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  //http://localhost:3000/user-edit : put by profile when pic uplodas
  editUserPictureAPI(reqBody:any){
     return this.http.put(`${this.server_url}/user-edit`,reqBody,this.appendToken())
  }
  ///feedbacks-approve : get by home page when it loads
  getApproveFeedbacksAPI(){
     return this.http.get(`${this.server_url}/feedbacks-approve`)
  }
  //http://localhost:3000/user-list get by admin users when [age loads]
  getUserListAPI(){
     return this.http.get(`${this.server_url}/user-list`,this.appendToken())
  }
  //downloads
  getDownloadListAPI(){
     return this.http.get(`${this.server_url}/downloads`,this.appendToken())
  }
  //http://localhost:3000/feedbacks get by admin feedback when page loads
  getFeedbackListAPI(){
     return this.http.get(`${this.server_url}/feedbacks`,this.appendToken())
  }
  //http://localhost:3000/feedbacks/697866d79dc39140307a5d8b : put by feedback when approve / reject btn clicked
  updateFeedbackStatusAPI(id:string,reqBody:any){
     return this.http.put(`${this.server_url}/feedbacks/${id}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes : post rqst by manage recipe compoenent when add btn clicked
  addRecipeAPI(reqBody:RecipeModel){
     return this.http.post(`${this.server_url}/recipes`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes/69818ec6bfe9b48e046ed70e : delete by recipes when delete btn clicked
  removeRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipes/${id}`,this.appendToken())
  }

  //http://localhost:3000/recipes/6982e3a0eb593620e4b5a6bb : put reqst by manage recipe compoenent when update btn clicked
  editRecipeAPI(id:string,reqBody:RecipeModel){
     return this.http.put(`${this.server_url}/recipes/${id}`,reqBody,this.appendToken())
  }

  getChartData(){
    this.getDownloadListAPI().subscribe((res:any)=>{
      let downloadlistArray:any = []
      let output:any = {}
      res.forEach((item:any)=>{
        let cuisine = item.cuisine
        let currentCount = item.count
        if(cuisine in output){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount
        }
      })
      console.log(output);
      for(let cuisine in output){
        downloadlistArray.push({name:cuisine,y:output[cuisine]})
      }
      localStorage.setItem("chart",JSON.stringify(downloadlistArray))
    })
  }
  
}
