import { inject } from '@angular/core';
import { Router, type ResolveFn } from '@angular/router';

export const seleccionesResolver: ResolveFn<boolean> = (route, state) => {
      const router = inject(Router);
  const nav = router.getCurrentNavigation();
  const myState = nav?.extras?.state;
    console.log( myState)
  return true;
};
