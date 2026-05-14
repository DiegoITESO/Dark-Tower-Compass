import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, take, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.userSignal).pipe(
    filter((user) => user !== undefined),
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    }),
  );
};
