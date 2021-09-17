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
    getItemsOnPage, getPreloadedSettings,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';
import Pagination from '../common/Pagination/Pagination';
import {initSetting} from '../../redux/settings-reducer';


type UsersAPIPropsType = {
    users: Array<UserType>
    itemsOnPage: number
    settings: {value: number, touched: boolean}
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
    setCurrentPage(payload: {currentPage: number}): void
    setTotalUsersCount(payload: {totalUsersCount: number}): void
    setItemsOnPage(payload: {itemsOnPage: number}): void
    initSetting(): void
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

    onSettingsChange = (itemsOnPage: number) => {
        const {getUsers, setItemsOnPage, initSetting} = this.props
        setItemsOnPage({itemsOnPage})
        initSetting()
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
                        settings={this.props.settings}
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
        settings: getPreloadedSettings(state),
        followRequestsInProgress: getFollowRequestsInProgress(state),
        users: getUsers(state),
        isFetching: getIsFetching(state)
    }
}

const UsersContainer = connect(mapStateToProps, {
    setCurrentPage,
    setTotalUsersCount,
    setItemsOnPage,
    initSetting: () => initSetting({setting: 'pagination'}),
    toggleRequestIsInProgress,
    getUsers: getUsersThunk,
    toggleFollow: toggleFollowThunk
})(UsersAPI)

export default UsersContainer