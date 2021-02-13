import {ActionTypes, AppDispatchType} from '../types/types';
import {appAPI} from '../api/api';

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

export type SetAuthType = { // todo - деструктуризация?
    userId: number | string | null
    email: string | null
    login: string | null
}

export const setAuthUserData = ({userId, email, login}: SetAuthType) => (
    {
        type: SET_USER_DATA,
        data: {userId, email, login}
    } as const
)

// Thunks

export const setAuthThunk = () => (dispatch: AppDispatchType) => {
    appAPI.setAuth().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData({userId: id, email, login}))
        }
    })
}

export default authReducer
