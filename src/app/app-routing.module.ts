import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
   {
    path: 'register-admin',component: RegisterAdminComponent,canActivate: [authGuard],data: { role: 'ROLE_ADMIN' }           },

  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard], data: { role: 'ROLE_USER' } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
