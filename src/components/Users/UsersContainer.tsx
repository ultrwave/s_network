import {connect} from 'react-redux';
import {
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleFetchingAC,
    toggleFollowAC
} from '../../redux/users-reducer';
import {StateType, UserType} from '../../types/types';
import React from 'react';
import axios from 'axios';
import {Users} from './Users';
import Style from './Users.module.css';
import preloader from '../../assets/images/loader.gif'
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

class UsersAPIComponent extends React.Component<UsersAPIPropsType> {


    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChange = (page: number) => {

        this.props.toggleFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`) // todo - $ ?
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
            })

        this.props.setCurrentPage(page)
    }

    // todo - почему в классе нужен метод рендер для отрисовки а в обычных компонентах не нужен?
    render() {
        return <>
            {this.props.isFetching &&
            <Preloader/> ||
            <Users
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                onPageChange={this.onPageChange}
                toggleFollow={this.props.toggleFollow}
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

const mapDispatchToProps = (dispatch: Function) => {
    return {
        toggleFollow: (userId: string) => {
            dispatch(toggleFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
        toggleFetching: (isFetching: boolean) => {
            dispatch(toggleFetchingAC(isFetching))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)