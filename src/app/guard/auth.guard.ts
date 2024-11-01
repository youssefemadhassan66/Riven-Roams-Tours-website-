import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../services/Auth/auth-services.service';
import e from 'express';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServicesService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
