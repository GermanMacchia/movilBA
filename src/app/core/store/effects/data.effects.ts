import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, delay, map, mergeMap, of } from 'rxjs'

import { ApiService } from '@api/api-service'
import { Store } from '@ngrx/store'
import { AuthService } from '@src/app/core/services/auth-service'
import * as dataActions from '../actions/data.actions'
import * as loginActions from '../actions/login.actions'

@Injectable()
export class DataEffects {
    private actions$ = inject(Actions)
    private apiService = inject(ApiService)
    private authService = inject(AuthService)
    private store$ = inject(Store)

    loadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.loginSuccess),
            mergeMap(({usuario: { rol }}) =>{
                this.store$.dispatch(dataActions.dataLoading())
                return this.apiService.getData(rol).pipe(
                    delay(1000),
                    map(( {data}) => dataActions.setData({data})),
                    catchError(error => of(dataActions.dataLoadingError({error})))
                )
            })
        )
    )



    dataLoaded$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dataActions.setData),
            map(() => dataActions.dataLoadingSuccess()),
        ),
    )
}

