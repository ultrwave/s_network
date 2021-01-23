import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {setUserProfile} from '../../../redux/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Page} from '../../../stories/Page';

type MDTPType = {
    setUserProfile: (user: UserProfileType) => void
}

type MSTPType = {
    profile: UserProfileType | null
}

type MatchType = {
    userId: string
}

type ProfileContainerProps = RouteComponentProps<MatchType>

export type PageProfileType = MDTPType & MSTPType

class ProfileAPI extends React.Component<PageProfileType & ProfileContainerProps> { // todo - ?

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
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

const ProfileAPIWithUrlData = withRouter(ProfileAPI)

export const ProfileContainer = connect(mapStateToProps, {setUserProfile})(ProfileAPIWithUrlData)
