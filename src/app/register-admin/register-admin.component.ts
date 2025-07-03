import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html'
})
export class RegisterAdminComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['ROLE_ADMIN'] // no need Validators.required here since it's fixed
    });
  }

  // Convenience getters for form controls
  get name() { return this.registerForm.get('name'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get role() { return this.registerForm.get('role'); }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return; // stops submission if form invalid
    }

    this.auth.registerAdmin(this.registerForm.value).subscribe({
      next: () => {
        alert('Admin registered successfully');
        this.router.navigate(['/login']); // redirect to login after success
      },
      error: (error) => {
        alert('Admin registration failed: ' + (error.error?.message || 'Unknown error'));
      }
    });
  }
}
