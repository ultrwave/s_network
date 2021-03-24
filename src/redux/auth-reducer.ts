import {ActionTypes, AppDispatchType} from '../types/types';
import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA' // todo - зачем эти переменные?
const SHOW_CAPTCHA = 'SHOW-CAPTCHA'

type AuthStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha?: string
}

const initialState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: undefined
}

const authReducer = (state: AuthStateType = initialState, action: ActionTypes): AuthStateType => {

    switch (action.type) {

        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.payload
            }

        case 'SHOW-CAPTCHA':
            return {
                ...state,
                captcha: action.captchaURL
            }

        default:
            return state
    }
}

export const setAuthUserData = (payload: AuthStateType) => (
    {
        type: SET_USER_DATA,
        payload
    } as const
)

export const showCaptcha = (captchaURL: string) => (
    {
        type: SHOW_CAPTCHA,
        captchaURL
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

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    (dispatch: AppDispatchType) => {
        authAPI.login({email, password, rememberMe}).then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthThunk() as any) // todo - as any?
            // } else if (data.resultCode === 10) { // todo - enum?
            //     dispatch(getCaptchaThunk() as any)
            } else {
                let message = data.messages.length > 0
                    ? data.messages[0]
                    : 'unknown error'
                let action = stopSubmit('login', {_error: message})
                dispatch(action)
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


export const getCaptchaThunk = () => (dispatch: AppDispatchType) => {
    authAPI.getCaptcha().then(captchaURL => {
        dispatch(showCaptcha(captchaURL))
    })
}

export default authReducer
