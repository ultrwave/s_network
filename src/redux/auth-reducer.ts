import {ActionTypes, AppThunk} from '../types/types';
import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';


const SET_USER_DATA = 'sn01/auth/SET_USER_DATA'
const SHOW_CAPTCHA = 'sn01/auth/SHOW_CAPTCHA'

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

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        case SHOW_CAPTCHA:
            return {
                ...state,
                captcha: action.payload.captchaURL
            }

        default:
            return state
    }
}

export const setAuthUserData = (payload: AuthStateType) => (
    {type: SET_USER_DATA, payload} as const
)

export const showCaptcha = (payload: {captchaURL: string}) => (
    {type: SHOW_CAPTCHA, payload} as const
)

// Thunks

export const setAuthThunk = (): AppThunk => async (dispatch) => {
    const response = await authAPI.me();
    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData({userId: id, email, login, isAuth: true}))
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk =>
    async (dispatch) => {
        const response = await authAPI.login({email, password, rememberMe, captcha});
        if (response.resultCode === 0) {
            dispatch(setAuthThunk())
        } else {
            if (response.resultCode === 10) {
                dispatch(getCaptchaThunk())
            }
            let message = response.messages.length > 0
                ? response.messages[0]
                : 'unknown error'
            let action = stopSubmit('login', {_error: message})
            dispatch(action)
        }
    }

export const logoutThunk = (): AppThunk =>
    async (dispatch) => {
        const response = await authAPI.logout()
        if (response.resultCode === 0) {
            dispatch(setAuthUserData({userId: null, email: null, login: null, isAuth: false}))
        }
    }

export const getCaptchaThunk = (): AppThunk =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaURL = response.data.url

        dispatch(showCaptcha(captchaURL))
    }

export default authReducer
