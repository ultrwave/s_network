import {ActionTypes, AppThunk, UserType} from '../types/types';
import {appAPI} from '../api/api';

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
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

        case SET_USERS:
            return {...state, users: [...action.users]}

        case TOGGLE_FETCHING :
            return {...state, isFetching: action.isFetching}

        case TOGGLE_REQUEST_IS_IN_PROGRESS:

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


        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    user => user.id === action.userId ? {...user, followed: !user.followed} : user
                )
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_TOTAL_USERS_COUNT:
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

// Thunks

export const toggleFollowThunkCreator = (user: UserType): AppThunk => (dispatch) => {

    dispatch(toggleRequestIsInProgress(user.id, true))

    appAPI.toggleFollow(user).then(resultCode => {
        if (resultCode === 0) dispatch(toggleFollow(user.id))
        dispatch(toggleRequestIsInProgress(user.id, false))
    })
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {

    dispatch(toggleFetching(true))
    dispatch(setCurrentPage(currentPage))

    appAPI.getUsers(currentPage, pageSize).then(data => {

        dispatch(toggleFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}

export default usersReducer