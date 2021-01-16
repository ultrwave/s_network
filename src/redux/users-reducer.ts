import {ActionTypes, UserType} from '../types/types';

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'
const SET_USERS = 'SET-USERS'

type PageStateType = {
    users: Array<UserType>
}

const initialState: PageStateType = {
    users: []
}

const usersReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USERS':
            return {...state, users: [...state.users, ...action.users]}

        case 'TOGGLE-FOLLOW':
            return {
                ...state,
                users: state.users.map(
                    user => user.id === action.userId ? {...user, followed: !user.followed} : user
                )
            }

        default:
            return state
    }
}


export const toggleFollowAC = (userId: string) => (
    {
        type: TOGGLE_FOLLOW,
        userId
    } as const
)

export const setUsersAC = (users: Array<UserType>) => (
    {
        type: SET_USERS,
        users
    } as const
)

export default usersReducer