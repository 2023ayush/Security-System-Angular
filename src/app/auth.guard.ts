import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';;

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const actualRole = authService.getUserRole();

  if (!actualRole) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRole && actualRole !== expectedRole) {
    router.navigate(['/unauthorized']); // optional
    return false;
  }

  return true;
};
