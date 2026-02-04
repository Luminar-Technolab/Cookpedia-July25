import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  api = inject(ApiService)
  isSidebarOpen:boolean = true
  router = inject(Router)
  userCount = signal<number>(0)
  recipeCount = signal<number>(0)
  downloadCount = signal<number>(0)
  notificationCount = signal<number>(0)

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getNotificationCount()
  }
  getNotificationCount(){
    this.api.getFeedbackListAPI().subscribe((res:any)=>{
      this.notificationCount.set(res.filter((item:any)=>item.status=="pending").length)
    })
  }
  getDownloadCount(){
    this.api.getDownloadListAPI().subscribe((res:any)=>{
      this.downloadCount.set(res.length)
    })
  }
  getRecipeCount(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.recipeCount.set(res.length)
    })
  }
  getUserCount(){
    this.api.getUserListAPI().subscribe((res:any)=>{
      this.userCount.set(res.length)
    })
  }

  

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen
  }
  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
