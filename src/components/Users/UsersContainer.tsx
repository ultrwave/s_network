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
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (page: number) => {
        this.props.getUsers(page, this.props.pageSize)
        this.props.setCurrentPage(page)
    }

    toggleFollow = (user: UserType) => {
        this.props.toggleFollow(user)
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
        users: state.pageUsers.users,
        pageSize: state.pageUsers.pageSize,
        totalUsersCount: state.pageUsers.totalUsersCount,
        currentPage: state.pageUsers.currentPage,
        isFetching: state.pageUsers.isFetching,
        followRequestsInProgress: state.pageUsers.followRequestsInProgress
    }
}

export const UsersContainer = connect(mapStateToProps, {
    setCurrentPage,
    setTotalUsersCount,
    toggleRequestIsInProgress,
    getUsers: getUsersThunkCreator,
    toggleFollow: toggleFollowThunkCreator
})(UsersAPI)