import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="container mt-5">
      <h2>User Dashboard</h2>
      <p>Welcome, {{ username }}!</p>

      <h4>Users List (Protected)</h4>
      <ul>
        <li *ngFor="let u of users">{{ u.username }} - {{ u.role }}</li>
      </ul>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  users: any[] = [];
  username = '';

  constructor(private userService: UserService, private auth: AuthService) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername();
    const token = this.auth.getToken();

    this.userService.getAllUsers(token).subscribe({
      next: (res: any) => this.users = res,
      error: () => alert('Failed to load protected data')
    });
  }
}
