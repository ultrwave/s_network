import {ActionTypes, AppThunk, UserType} from '../types/types';
import {appAPI} from '../api/api';

const SET_FRIENDS_ONLINE = 'sn01/users/SET_FRIENDS_ONLINE'
const SET_USERS = 'sn01/users/SET_USERS'
const SET_CURRENT_PAGE = 'sn01/users/SET_CURRENT_PAGE'
const SET_ITEMS_ON_PAGE = 'sn01/users/SET_ITEMS_ON_PAGE'
const SET_TOTAL_USERS_COUNT = 'sn01/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_FOLLOW = 'sn01/users/TOGGLE_FOLLOW'
const TOGGLE_FETCHING = 'sn01/users/TOGGLE_FETCHING'
const TOGGLE_REQUEST_IS_IN_PROGRESS = 'sn01/users/TOGGLE_REQUEST_IS_IN_PROGRESS'

type PageStateType = {
    friendsOnline: Array<UserType>
    users: Array<UserType>
    itemsOnPage: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
}

const initialState: PageStateType = {
    friendsOnline: [],
    users: [],
    totalUsersCount: 0,
    itemsOnPage: 5,
    currentPage: 1,
    isFetching: true,
    followRequestsInProgress: []

}

const usersReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case SET_FRIENDS_ONLINE:
            return {...state, friendsOnline: [...action.payload.friendsOnline]}

        case SET_USERS:
            return {...state, users: [...action.payload.users]}

        case TOGGLE_FETCHING :
            return {...state, isFetching: action.payload.isFetching}

        case TOGGLE_REQUEST_IS_IN_PROGRESS:

            if (action.payload.toggle) {
                return {
                    ...state,
                    followRequestsInProgress: [...state.followRequestsInProgress, action.payload.userId]
                }
            } else {
                return {
                    ...state,
                    followRequestsInProgress: state.followRequestsInProgress
                        .filter(id => id !== action.payload.userId)
                }
            }

        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    user => user.id === action.payload.userId
                        ? {...user, followed: !user.followed}
                        : user
                )
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.payload.totalUsersCount
            }

        case SET_ITEMS_ON_PAGE:
            return {
                ...state,
                itemsOnPage: action.payload.itemsOnPage
            }

        default:
            return state
    }
}

export const toggleFetching = (payload: {isFetching: boolean}) => (
    {type: TOGGLE_FETCHING, payload} as const
)

export const toggleRequestIsInProgress = (payload: {userId: string, toggle: boolean}) => (
    {type: TOGGLE_REQUEST_IS_IN_PROGRESS, payload} as const
)

export const toggleFollow = (payload: {userId: string}) => (
    {type: TOGGLE_FOLLOW, payload} as const
)

export const setFriendsOnline = (payload: {friendsOnline: Array<UserType>}) => (
    {type: SET_FRIENDS_ONLINE, payload} as const
)

export const setUsers = (payload: {users: Array<UserType>}) => (
    {type: SET_USERS, payload} as const
)

export const setCurrentPage = (payload: {currentPage: number}) => (
    {type: SET_CURRENT_PAGE, payload} as const
)

export const setItemsOnPage = (payload: {itemsOnPage: number}) => (
    {type: SET_ITEMS_ON_PAGE, payload} as const
)

export const setTotalUsersCount = (payload: {totalUsersCount: number}) => (
    {type: SET_TOTAL_USERS_COUNT, payload} as const
)

// Thunks

export const toggleFollowThunk = (user: UserType): AppThunk => async (dispatch) => {

    dispatch(toggleRequestIsInProgress({userId: user.id, toggle: true}));

    const resultCode = await appAPI.toggleFollow(user)
    if (resultCode === 0) dispatch(toggleFollow({userId: user.id}))
    dispatch(toggleRequestIsInProgress({userId: user.id, toggle: false}))
}

export const getUsersThunk = (): AppThunk => async (dispatch, getState) => {

    const newPage = getState().pageUsers.currentPage || 1
    const pageSize = getState().pageUsers.itemsOnPage

    dispatch(toggleFetching({isFetching: true}))
    dispatch(setCurrentPage({currentPage: newPage}))

    const response = await appAPI.getUsers(newPage, pageSize);

    dispatch(toggleFetching({isFetching: false}))
    dispatch(setUsers({users: response.items}))
    dispatch(setTotalUsersCount({totalUsersCount: response.totalCount}))
}

export const getFriendsOnlineThunk = (): AppThunk => async (dispatch) => { // todo - latest users with avatars
    let page = 25
    let friendsOnline: UserType[] = []
    let attempts = 10
    while ((friendsOnline.length < 3) && attempts) {
        const response = await appAPI.getUsers(page,100);
        friendsOnline = response.items.filter((u: UserType) => u.photos.large).slice(0, 3)
        page += 25
        attempts--
    }
    dispatch(setFriendsOnline({friendsOnline}))
}

export default usersReducer