// admin-dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']  // optional
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  goToRegisterAdmin() {
    this.router.navigate(['/register-admin']);
  }
}

