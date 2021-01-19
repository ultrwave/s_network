import {ActionTypes, UserType} from '../types/types';

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'

type PageStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

const initialState: PageStateType = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true

}

const usersReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USERS':
            return {...state, users: [...action.users]}

        case 'TOGGLE-FETCHING' :
            return {...state, isFetching: action.isFetching}

        case 'TOGGLE-FOLLOW':
            return {
                ...state,
                users: state.users.map(
                    user => user.id === action.userId ? {...user, followed: !user.followed} : user
                )
            }

        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }

        case 'SET-TOTAL-USERS-COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        default:
            return state
    }
}

export const toggleFetchingAC = (isFetching: boolean) => (
    {
        type: TOGGLE_FETCHING,
        isFetching
    } as const
)

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

export const setCurrentPageAC = (currentPage: number) => (
    {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
)

export const setTotalUsersCountAC = (totalUsersCount: number) => (
    {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
)

export default usersReducer
