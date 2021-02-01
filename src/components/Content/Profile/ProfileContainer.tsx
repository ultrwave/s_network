import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {getProfileThunk} from '../../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';

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

export type ProfileContainerProps = RouteComponentProps<MatchType> & MDTPType & MSTPType

class ProfileAPI extends React.Component<ProfileContainerProps> {

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

const mapStateToProps = (state: StateType): MSTPType => ({
    profile: state.pageProfile.profile,
    isAuth: state.auth.isAuth
})

const ProfileAPIWithUrlData = withRouter(ProfileAPI)

export const ProfileContainer = connect(mapStateToProps, {getProfileThunk})(ProfileAPIWithUrlData)
