import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {
    getProfileThunk,
    getStatusThunk,
    savePhotoThunk,
    saveProfileThunk,
    updateStatusThunk
} from '../../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';

export type MDTPType = {
    getProfileThunk (userId: string): void
    getUserStatus (userId: string): void
    updateUserStatus (status: string): void
    savePhotoThunk (photo: File): void
    saveProfileThunk (profile: UserProfileType): void
}

export type MSTPType = {
    profile: UserProfileType | null
    status: string
    authorizedUserId: string | null
    isAuth: boolean
}

export type MSTPIsAuthType = {
    isAuth: boolean
}

type MatchType = {
    userId: string
}

export type ProfileContainerPropsType = RouteComponentProps<MatchType> & MDTPType & MSTPType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    showMeButton = false

    refreshProfile() {
        let userId = this.props.match.params.userId
        let myId = this.props.authorizedUserId
        this.showMeButton = userId? (userId !== myId) : false
        if (!userId) {
            userId = myId || '2'
            if (!myId) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfileThunk(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerPropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div className={Style.content}>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         savePhoto={this.props.savePhotoThunk}
                         saveProfile={this.props.saveProfileThunk}
                />
                {this.showMeButton && < span
                    className={Style.showMeButton}
                    onClick={() => {
                        this.props.history.push("/profile")
                    }}>Me</span>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: StateType): MSTPType => ({
    profile: state.pageProfile.profile,
    status: state.pageProfile.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(
        mapStateToProps,
        {
            getProfileThunk,
            getUserStatus: getStatusThunk,
            updateUserStatus: updateStatusThunk,
            savePhotoThunk,
            saveProfileThunk
        }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer) as React.ComponentType