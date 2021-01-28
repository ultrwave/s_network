import {connect} from 'react-redux';
import {
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow
} from '../../redux/users-reducer';
import {StateType, UserType} from '../../types/types';
import React from 'react';
import axios from 'axios';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';


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
}

class UsersAPI extends React.Component<UsersAPIPropsType> {


    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChange = (page: number) => {

        this.props.toggleFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
            })

        this.props.setCurrentPage(page)
    }

    toggleFollow = (user: UserType) => {
        !user.followed ?
            (axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                withCredentials: true,
                headers: {
                    'API-KEY': '9b61cb41-6326-4a3b-b5b4-20d19c98a067'
                }
            })
                .then(response => {
                    if (response.data.resultCode === 0) {
                        this.props.toggleFollow(user.id)
                    }
                })) :
            (axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                withCredentials: true,
                headers: {
                    'API-KEY': '9b61cb41-6326-4a3b-b5b4-20d19c98a067'
                }

            })
                .then(response => {
                    if (response.data.resultCode === 0) {
                        this.props.toggleFollow(user.id)
                    }
                }))
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
        isFetching: state.pageUsers.isFetching
    }
}

export const UsersContainer = connect(mapStateToProps, {
    toggleFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching
})(UsersAPI)