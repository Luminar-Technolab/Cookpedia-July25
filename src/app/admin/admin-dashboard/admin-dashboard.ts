import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  isSidebarOpen:boolean = true
  router = inject(Router)

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen
  }
  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
