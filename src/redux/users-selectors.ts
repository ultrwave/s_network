import {StateType} from '../types/types';
import {createSelector} from 'reselect'

const getUsersSelector = (state: StateType) => {
    return state.pageUsers.users
}

export const getPageSize = (state: StateType) => {
    return state.pageUsers.pageSize
}

export const getTotalUsersCount = (state: StateType) => {
    return state.pageUsers.totalUsersCount
}

export const getCurrentPage = (state: StateType) => {
    return state.pageUsers.currentPage
}

export const getIsFetching = (state: StateType) => {
    return state.pageUsers.isFetching
}

export const getFollowRequestsInProgress = (state: StateType) => {
    return state.pageUsers.followRequestsInProgress
}

// Reselect

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})
