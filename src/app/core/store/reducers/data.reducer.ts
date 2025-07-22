import {Action, createReducer, on} from '@ngrx/store'
import {dataLoading, dataLoadingError, dataLoadingSuccess, setData} from '@src/app/core/store/actions/data.actions';


//STATE
export interface DataState {
    loading: boolean
    error: any
    data: any
}

//INITIAL
export const DataInitialState: DataState = {
    loading: false,
    error: null,
    data: null,
}

//REDUCER
const _DataReducer = createReducer(
    DataInitialState,

    on(dataLoading, state => ({
        ...state,
        loading: true,
    })),

    on(dataLoadingSuccess, state => ({
        ...state,
        loading: false,
    })),

    on(dataLoadingError, (state, {error}) => ({
        ...state,
        loading: false,
        error: error?.error,
    })),

    on(setData, (state, {data}) => ({
        ...state,
        data,
    })),
)

export function DataReducer(
    state: DataState | undefined,
    action: Action<string>,
) {
    return _DataReducer(state, action)
}
