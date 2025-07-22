import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, mergeMap, of} from 'rxjs'

import * as dataActions from '../actions/data.actions'
import * as loginActions from '../actions/login.actions'
import {ApiService} from '@api/api-service';

@Injectable()
export class DataEffects {
    private actions$ = inject(Actions)
    private apiService = inject(ApiService)

    getData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.loginSuccess),
            mergeMap(({rol}) =>
                this.apiService.getData(rol).pipe(
                    map(( {data}) => {
                        return dataActions.setData({data})
                    }),
                    catchError(error => of(dataActions.dataLoadingError({error})))
                )
            )
        )
    )

    dataLoaded$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dataActions.setData),
            map(() => dataActions.dataLoadingSuccess()),
        ),
    )
}

