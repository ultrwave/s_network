import {ActionTypes} from './store';
import {v1} from 'uuid';


const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'
// todo - подсвечивает case: 'TOGGLE-FOLLOW' как unreachable если убрать as const
const SET_USERS = 'SET-USERS'

export type UserType = {
    id: string
    firstName: string
    photoUrl: string
    status: string
    location: {city: string, country: string}
    isFollowed: boolean
}

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
                    user => user.id === action.userId ? {...user, isFollowed: !user.isFollowed} : user
                )
            }

        default: return state
    }
}


export const toggleFollowAC = (userId: string) => ({type: TOGGLE_FOLLOW, userId} as const)

export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)

export default usersReducer