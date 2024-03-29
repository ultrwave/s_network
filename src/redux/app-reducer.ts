import {ActionTypes, AppThunk} from '../types/types';
import {setAuthThunk} from './auth-reducer';

const SET_INITIALIZED = 'sn01/app/SET_INITIALIZED'
const SET_GLOBAL_ERROR = 'sn01/app/SET_GLOBAL_ERROR'

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

        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.payload.error
            }

        default:
            return state
    }
}

export const setInitialized = () => ({type: SET_INITIALIZED} as const)
export const setGlobalError = (payload: {error: string}) => ({type: SET_GLOBAL_ERROR, payload} as const)


// Thunks

export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(setAuthThunk())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized())
        })
        .catch(error => {
            dispatch(setGlobalError({error}))
            console.log(`App error: ${error}`)
        })
}

export default appReducer
