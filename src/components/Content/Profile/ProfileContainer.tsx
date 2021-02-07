import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {getProfileThunk} from '../../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

type MDTPType = {
    getProfileThunk: (userId: string) => void
}

type MSTPType = {
    profile: UserProfileType | null
    isAuth: boolean
}

type MatchType = {
    userId: string
}

export type ProfileContainerPropsType = RouteComponentProps<MatchType> & MDTPType & MSTPType

class ProfileAPI extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }
        this.props.getProfileThunk(userId)
    }

    render() {
        return (
            <div className={Style.content}>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

const ProfileAuthRedirect = (props: ProfileContainerPropsType) => {
    return !props.isAuth ?
        <Redirect to='/login'/>
        : <ProfileAPI {...props} />
}

const mapStateToProps = (state: StateType): MSTPType => ({
    profile: state.pageProfile.profile,
    isAuth: state.auth.isAuth
})

const ProfileAPIWithUrlData = withRouter(ProfileAuthRedirect)

export const ProfileContainer = connect(mapStateToProps, {getProfileThunk})(ProfileAPIWithUrlData)
