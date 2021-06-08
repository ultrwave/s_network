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


type UsersAPIPropsType = {
    users: Array<UserType>
    itemsOnPage: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
    setCurrentPage (currentPage: number): void
    setTotalUsersCount(totalUsersCount: number): void
    setItemsOnPage(amount: number): void
    toggleRequestIsInProgress (userId: string, toggle: boolean): void
    toggleFollow (user: UserType): void
    getUsers (currentPage: number, pageSize: number): void
}

class UsersAPI extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        const {currentPage, itemsOnPage, getUsers} = this.props
        getUsers(currentPage, itemsOnPage)
    }

    onPageChange = (page: number) => {
        const {itemsOnPage, getUsers, setCurrentPage} = this.props
        setCurrentPage(page)
        getUsers(page, itemsOnPage)
    }

    onSettingsChange = (itemsAmount: number) => {
        const {currentPage, getUsers, setItemsOnPage} = this.props
        setItemsOnPage(itemsAmount)
        getUsers(currentPage, itemsAmount)
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
                    itemsOnPage={this.props.itemsOnPage}
                    onPageChange={this.onPageChange}
                    onSettingsChange={this.onSettingsChange}
                    toggleFollow={this.toggleFollow}
                    followRequestsInProgress={this.props.followRequestsInProgress}
                />}
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