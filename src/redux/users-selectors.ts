import {StateType} from '../types/types';

export const getUsers = (state: StateType) => {
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

