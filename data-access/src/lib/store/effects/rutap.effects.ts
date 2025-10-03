import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { RutapApiService } from "../../api/rutap-api-service";
import { fetchEntidades, rutapError, setEntidades } from "../actions/rutap.actions";

@Injectable()
export class RutapEffects {
	private actions$ = inject(Actions)
	private rutapApiService = inject(RutapApiService)
	private store$ = inject(Store)

	fetchEntidades$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchEntidades),
			switchMap(() => this.rutapApiService.entidades()),
			map((entidades) => setEntidades({ data: entidades })),
			catchError(error => of(rutapError({ data: error })))
		),
	)
}