import {ActionTypes, AppDispatchType, UserType} from '../types/types';
import {instance} from '@storybook/node-logger';
import {usersAPI} from '../api/api';

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW' // todo - переделать в enum
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'
const TOGGLE_REQUEST_IS_IN_PROGRESS = 'TOGGLE-REQUEST-IS-IN-PROGRESS'

type PageStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
}

const initialState: PageStateType = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    followRequestsInProgress: []

}

const usersReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USERS':
            return {...state, users: [...action.users]}

        case 'TOGGLE-FETCHING' :
            return {...state, isFetching: action.isFetching}

        case 'TOGGLE-REQUEST-IS-IN-PROGRESS':

            if (action.toggle) {
                return {
                    ...state,
                    followRequestsInProgress: [...state.followRequestsInProgress, action.userId]
                }
            } else {
                return {
                    ...state,
                    followRequestsInProgress: state.followRequestsInProgress
                        .filter(id => id !== action.userId)
                }
            }


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

export const toggleFetching = (isFetching: boolean) => (
    {
        type: TOGGLE_FETCHING,
        isFetching
    } as const
)

export const toggleRequestIsInProgress = (userId: string, toggle: boolean) => (
    {
        type: TOGGLE_REQUEST_IS_IN_PROGRESS,
        userId,
        toggle
    } as const
)

export const toggleFollow = (userId: string) => (
    {
        type: TOGGLE_FOLLOW,
        userId
    } as const
)

export const setUsers = (users: Array<UserType>) => (
    {
        type: SET_USERS,
        users
    } as const
)

export const setCurrentPage = (currentPage: number) => (
    {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
)

export const setTotalUsersCount = (totalUsersCount: number) => (
    {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
)

export default usersReducer


// export const toggleFollowThunk = (user: UserType) => (dispatch: AppDispatchType) => {
//     dispatch(toggleRequestIsInProgress(user.id, true))
//     !user.followed ?
//         (instance.post(`follow/${user.id}`, {})
//             .then((response: any) => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(toggleFollow(user.id))
//                 }
//                 dispatch(toggleRequestIsInProgress(user.id, false))
//             })) :
//         (instance.delete(`follow/${user.id}`)
//             .then((response: any) => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(toggleFollow(user.id))
//                 }
//                 dispatch(toggleRequestIsInProgress(user.id, false))
//             }))
// }

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => (dispatch: AppDispatchType) => {

    dispatch(toggleFetching(true))

    usersAPI.getUsers(currentPage, pageSize).then(data => {

        dispatch(toggleFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}