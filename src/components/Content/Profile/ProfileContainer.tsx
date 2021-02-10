import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {getProfileThunk} from '../../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';

export type MDTPType = {
    getProfileThunk: (userId: string) => void
}

export type MSTPType = {
    profile: UserProfileType | null
}

export type MSTPIsAuthType = {
    isAuth: boolean
}

type MatchType = {
    userId: string
}

export type ProfileContainerPropsType = RouteComponentProps<MatchType> & MDTPType & MSTPType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

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
    profile: state.pageProfile.profile
})

export default compose(
    connect(
        mapStateToProps,
        {
            getProfileThunk
        }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer) as React.ComponentType