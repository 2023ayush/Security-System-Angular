import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, public router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auth.logout(); // Clear token when login page loads
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  fillDemoUser() {
    this.loginForm.patchValue({ username: 'user', password: 'user123' });
  }

  fillDemoAdmin() {
    this.loginForm.patchValue({ username: 'admin', password: 'admin123' });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.data) {
          // Save both token and username for dashboards
          const username = this.loginForm.value.username; // from form
          this.auth.saveAuthData(res.data, username);

          this.redirectBasedOnRole();
        } else {
          alert('No token received from server.');
        }
      },
      error: () => {
        this.loading = false;
        alert('Login failed. Backend may take a few seconds to respond.');
      }
    });
  }

  redirectBasedOnRole() {
    const role = this.auth.getUserRole();
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'ROLE_USER') {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
