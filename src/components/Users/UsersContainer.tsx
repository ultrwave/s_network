import {connect} from 'react-redux';
import {
    getUsersThunkCreator,
    setCurrentPage,
    setTotalUsersCount,
    toggleFollowThunkCreator,
    toggleRequestIsInProgress
} from '../../redux/users-reducer';
import {StateType, UserType} from '../../types/types';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {
    getCurrentPage,
    getFollowRequestsInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';


type UsersAPIPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
    setCurrentPage (currentPage: number): void
    setTotalUsersCount(totalUsersCount: number): void
    toggleRequestIsInProgress (userId: string, toggle: boolean): void
    toggleFollow (user: UserType): void
    getUsers (currentPage: number, pageSize: number): void
}

class UsersAPI extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        const {currentPage, pageSize, getUsers} = this.props
        getUsers(currentPage, pageSize)
    }

    onPageChange = (page: number) => {
        const {pageSize, getUsers, setCurrentPage} = this.props
        getUsers(page, pageSize)
        setCurrentPage(page)
    }

    toggleFollow = (user: UserType) => {
        const {toggleFollow} = this.props
        toggleFollow(user)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    onPageChange={this.onPageChange}
                    toggleFollow={this.toggleFollow}
                    followRequestsInProgress={this.props.followRequestsInProgress}
                />}
        </>
    }
}

const mapStateToProps = (state: StateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followRequestsInProgress: getFollowRequestsInProgress(state)
    }
}

export const UsersContainer = connect(mapStateToProps, {
    setCurrentPage,
    setTotalUsersCount,
    toggleRequestIsInProgress,
    getUsers: getUsersThunkCreator,
    toggleFollow: toggleFollowThunkCreator
})(UsersAPI)