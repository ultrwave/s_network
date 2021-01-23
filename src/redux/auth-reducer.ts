import {ActionTypes} from '../types/types';

const SET_USER_DATA = 'SET-USER-DATA'

type PageStateType = {
    userId: string | number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const initialState: PageStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state
    }
}

export type SetAuthType = { // todo - как сократить?
    userId: number | string | null
    email: string | null
    login: string | null
}

export const setAuthUserData = (userId: number | string | null,
                                email: string | null,
                                login: string | null) => (
    {
        type: SET_USER_DATA,
        data: {userId, email, login}
    } as const
)

export default authReducer
