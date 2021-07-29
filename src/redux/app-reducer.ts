import {ActionTypes, AppThunk} from '../types/types';
import {setAuthThunk} from './auth-reducer';

const SET_INITIALIZED = 'sn01/app/SET-INITIALIZED'

type AppStateType = {
    initialized: boolean
    globalError: string | null
}

const initialState: AppStateType = {
    initialized: false,
    globalError: null
}

const appReducer = (state: AppStateType = initialState, action: ActionTypes): AppStateType => {

    switch (action.type) {

        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

export const setInitialized = () => (
    {
        type: SET_INITIALIZED,
    } as const
)


// Thunks

export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(setAuthThunk())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized())
        })

}

export default appReducer
