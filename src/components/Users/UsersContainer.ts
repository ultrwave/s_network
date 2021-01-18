import {Users} from './Users';
import {connect} from 'react-redux';
import {setCurrentPageAC, setTotalUsersCountAC, setUsersAC, toggleFollowAC} from '../../redux/users-reducer';
import {StateType, UserType} from '../../types/types';


const mapStateToProps = (state: StateType) => {
    return {
        users: state.pageUsers.users,
        pageSize: state.pageUsers.pageSize,
        totalUsersCount: state.pageUsers.totalUsersCount,
        currentPage: state.pageUsers.currentPage,
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
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)