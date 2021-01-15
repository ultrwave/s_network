import {Users} from './Users';
import {connect} from 'react-redux';
import {setUsersAC, toggleFollowAC} from '../../redux/users-reducer';
import {StateType, UserType} from '../../types/types';


const mapStateToProps = (state: StateType) => {
    return state.pageUsers
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        toggleFollow: (userId: string) => {
            dispatch(toggleFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)