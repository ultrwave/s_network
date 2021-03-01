import {ActionTypes, AppDispatchType} from '../types/types';
import {authAPI} from '../api/api';

const SET_USER_DATA = 'SET-USER-DATA'
const CLEAR_USER_DATA = 'CLEAR-USER-DATA'

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
                ...action.payload
            }

        case 'CLEAR-USER-DATA':
            return {
                ...state,
                isAuth: false
            }

        default:
            return state
    }
}

export type SetAuthType = {
    userId: number | string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export const setAuthUserData = (payload: SetAuthType) => (
// export const setAuthUserData = ({userId, email, login, isAuth}:SetAuthType) => (
// todo - {} как деструктурировать без обертывания в объект?
    {
        type: SET_USER_DATA,
        payload
    } as const
)

export const clearAuthUserData = () => (
    {
        type: CLEAR_USER_DATA,
    } as const
)


// Thunks

export const setAuthThunk = () => (dispatch: AppDispatchType) => {
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData({userId: id, email, login, isAuth: true}))
        }
    })
}

export const loginThunk = (email: string, password: string, rememberMe: boolean) =>
    (dispatch: AppDispatchType) => {
        authAPI.login({email, password, rememberMe}).then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthThunk() as any) // todo - as any?
            }
        })
    }

export const logoutThunk = () =>
    (dispatch: AppDispatchType) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData({userId: null, email: null, login: null, isAuth: false}))
            }
        })
    }

export default authReducer
