import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { PermisosApiService } from "../../api/permisos-api-service";
import { fetchUsuarios, permisosError, setUsuarios } from "../actions/permisos.actions";

@Injectable()
export class PermisosEffects {
	private actions$ = inject(Actions)
	private permisosApiService = inject(PermisosApiService)
	private store$ = inject(Store)

	fetchUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchUsuarios),
			switchMap(() => this.permisosApiService.usuarios()),
			map((usuarios) => setUsuarios({ data: usuarios })),
			catchError(error => of(permisosError({ data: error })))
		)
	)
}