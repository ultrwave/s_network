import {ActionTypes, AppThunk, UserType} from '../types/types';
import {appAPI} from '../api/api';

const TOGGLE_FOLLOW = 'sn01/users/TOGGLE_FOLLOW'
const SET_USERS = 'sn01/users/SET_USERS'
const SET_CURRENT_PAGE = 'sn01/users/SET_CURRENT_PAGE'
const SET_ITEMS_ON_PAGE = 'sn01/users/SET_ITEMS_ON_PAGE'
const SET_TOTAL_USERS_COUNT = 'sn01/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING = 'sn01/users/TOGGLE_FETCHING'
const TOGGLE_REQUEST_IS_IN_PROGRESS = 'sn01/users/TOGGLE_REQUEST_IS_IN_PROGRESS'

type PageStateType = {
    users: Array<UserType>
    itemsOnPage: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
}

const initialState: PageStateType = {
    users: [],
    totalUsersCount: 0,
    itemsOnPage: 5,
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

        case SET_ITEMS_ON_PAGE:
            return {
                ...state,
                itemsOnPage: action.itemsOnPage
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

export const setItemsOnPage = (itemsOnPage: number) => (
    {
        type: SET_ITEMS_ON_PAGE,
        itemsOnPage
    } as const
)

export const setTotalUsersCount = (totalUsersCount: number) => (
    {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
)

// Thunks

export const toggleFollowThunkCreator = (user: UserType): AppThunk => async (dispatch) => {

    dispatch(toggleRequestIsInProgress(user.id, true));

    const resultCode = await appAPI.toggleFollow(user)
    if (resultCode === 0) dispatch(toggleFollow(user.id))
    dispatch(toggleRequestIsInProgress(user.id, false))

}

export const getUsersThunkCreator = (): AppThunk => async (dispatch, getState) => {

    const newPage = getState().pageUsers.currentPage || 1
    const pageSize = getState().pageUsers.itemsOnPage

    dispatch(toggleFetching(true))
    dispatch(setCurrentPage(newPage))


    const response = await appAPI.getUsers(newPage, pageSize);

    dispatch(toggleFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))

}

export default usersReducer