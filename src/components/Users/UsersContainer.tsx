import {connect} from 'react-redux';
import {
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow, toggleRequestIsInProgress
} from '../../redux/users-reducer';
import {StateType, UserType} from '../../types/types';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';


type UsersAPIPropsType = {
    users: Array<UserType>
    toggleFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    isFetching: boolean
    toggleFetching: (isFetching: boolean) => void
    followRequestsInProgress: string[]
    toggleRequestIsInProgress: (userId: string, toggle: boolean) => void
}

class UsersAPI extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        this.props.toggleFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChange = (page: number) => { // todo - почему если переписать на метод, всё падает?

        this.props.toggleFetching(true)

        usersAPI.getUsers(page, this.props.pageSize)
            .then(data => {
                this.props.toggleFetching(false)
                this.props.setUsers(data.items)
            })

        this.props.setCurrentPage(page)
    }

    toggleFollow = (user: UserType) => {
        usersAPI.toggleFollow(user, this.props.toggleFollow, this.props.toggleRequestIsInProgress)
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
    toggleFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching,
    toggleRequestIsInProgress
})(UsersAPI)