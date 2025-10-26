import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>{{ message }}</p>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  message = '';

  constructor(private adminService: AdminService, private auth: AuthService) {}

  ngOnInit(): void {
    const token = this.auth.getToken();
    this.adminService.getAdminMessage(token).subscribe({
      next: (res: any) => this.message = res,
      error: () => this.message = 'Cannot fetch admin data'
    });
  }
}
