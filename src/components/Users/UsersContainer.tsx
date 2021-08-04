import {connect} from 'react-redux';
import {
    getUsersThunkCreator,
    setCurrentPage,
    setItemsOnPage,
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
    followRequestsInProgress: string[]
    setCurrentPage(currentPage: number): void
    setTotalUsersCount(totalUsersCount: number): void
    setItemsOnPage(amount: number): void
    toggleRequestIsInProgress(userId: string, toggle: boolean): void
    toggleFollow(user: UserType): void
    getUsers(): void
}

class UsersAPI extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        const {getUsers} = this.props
        getUsers()
    }

    onPageChange = (page: number) => {
        const {getUsers, setCurrentPage} = this.props
        setCurrentPage(page)
        getUsers()
    }

    onSettingsChange = (itemsAmount: number) => {
        const {getUsers, setItemsOnPage} = this.props
        setItemsOnPage(itemsAmount)
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
                        onPageChange={this.onPageChange}
                        onSettingsChange={this.onSettingsChange}
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
    getUsers: getUsersThunkCreator,
    toggleFollow: toggleFollowThunkCreator
})(UsersAPI)

export default UsersContainer