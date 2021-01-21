import {ActionTypes} from '../types/types';

const SET_USER_DATA = 'SET-USER-DATA'

type PageStateType = {
    userId: string | number | null
    email: string | null
    login: string | null
}

const initialState: PageStateType = {
    userId: null,
    email: null,
    login: null,
}

const authReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data
            }

        default:
            return state
    }
}

export const setUserData = (userId: number | string | null,
                            email: string | null,
                            login: string | null) => (
    {
        type: SET_USER_DATA,
        data: {userId, email, login}
    } as const
)

export default authReducer
