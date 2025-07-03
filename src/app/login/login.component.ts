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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auth.logout(); // Clear token when login page loads
  }

  // Getter methods to access form controls easily in template
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return; // Stop if form is invalid
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.auth.saveToken(res.data); // Save token from response
          this.redirectBasedOnRole();
        } else {
          alert('No token received from server.');
        }
      },
      error: () => alert('Login failed')
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
