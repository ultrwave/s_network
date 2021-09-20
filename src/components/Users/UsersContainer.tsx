import {connect} from 'react-redux';
import {
    getUsersThunk,
    setCurrentPage,
    setItemsOnPage,
    setTotalUsersCount,
    toggleFollowThunk,
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
    getItemsOnPage,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';
import Pagination from '../common/Pagination/Pagination';


type UsersAPIPropsType = {
    users: Array<UserType>
    itemsOnPage: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: Array<string>
    setCurrentPage(payload: {currentPage: number}): void
    setTotalUsersCount(payload: {totalUsersCount: number}): void
    setItemsOnPage(payload: {itemsOnPage: number}): void
    toggleRequestIsInProgress(payload: {userId: string, toggle: boolean}): void
    toggleFollow(user: UserType): void
    getUsers(): void
}

class UsersAPI extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        const {getUsers} = this.props
        getUsers()
    }

    onPageChange = (currentPage: number) => {
        const {getUsers, setCurrentPage} = this.props
        setCurrentPage({currentPage})
        getUsers()
    }

    setItemsOnPage = (itemsOnPage: number) => {
        const {getUsers, setItemsOnPage} = this.props
        setItemsOnPage({itemsOnPage})
        getUsers()
    }

    toggleFollow = (user: UserType) => {
        const {toggleFollow} = this.props
        toggleFollow(user)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <>
                    <Pagination
                        totalItems={this.props.totalUsersCount}
                        currentPage={this.props.currentPage}
                        itemsOnPage={this.props.itemsOnPage}
                        setItemsOnPage={this.setItemsOnPage}
                        onPageChange={this.onPageChange}
                    />
                    <Users
                        users={this.props.users}
                        toggleFollow={this.toggleFollow}
                        followRequestsInProgress={this.props.followRequestsInProgress}
                    />
                </>
            }
        </>
    }
}

const mapStateToProps = (state: StateType) => {
    return {
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        itemsOnPage: getItemsOnPage(state),
        followRequestsInProgress: getFollowRequestsInProgress(state),
        users: getUsers(state),
        isFetching: getIsFetching(state)
    }
}

const UsersContainer = connect(mapStateToProps, {
    setCurrentPage,
    setTotalUsersCount,
    setItemsOnPage,
    toggleRequestIsInProgress,
    getUsers: getUsersThunk,
    toggleFollow: toggleFollowThunk
})(UsersAPI)

export default UsersContainer