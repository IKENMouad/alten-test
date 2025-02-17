import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthFacade } from 'app/store/auth/auth.facade';
import { map, } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);

  return authFacade.isLoggedIn$.pipe(
    map(isLoggedIn => isLoggedIn ? true : createUrlTreeFromSnapshot(route, ['/auth/login']))
  );
};