import {ActionTypes} from '../types/types';


const SET_INITIALIZED = 'SET-INITIALIZED'

type AuthStateType = {
    initialized: boolean
}

const initialState: AuthStateType = {
    initialized: false
}

const appReducer = (state: AuthStateType = initialState, action: ActionTypes): AuthStateType => {

    switch (action.type) {

        case SET_INITIALIZED:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const setInitialized = (payload: AuthStateType) => (
    {
        type: SET_INITIALIZED,
        payload
    } as const
)


// Thunks


export default appReducer
