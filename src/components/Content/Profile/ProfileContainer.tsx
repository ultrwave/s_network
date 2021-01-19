import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {setUserProfile} from '../../../redux/profile-reducer'; // todo - можно так импортировать?

type ProfileContainerPropsType = {
    setUserProfile: (user: UserProfileType) => void
}

class ProfileAPI extends React.Component<any> { // todo - fix any

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }


    render() { // todo - как починить пропсы Profile?
        return (
            <div className={Style.content}>
                <Profile {...this.props} profile={this.props.profile}/>
                {/*<Profile/>*/}
            </div>
        )
    }
}

const mapStateToProps = (state: StateType) => ({
    profile: state.pageProfile.profile
})

export const ProfileContainer = connect(mapStateToProps, {setUserProfile}) (ProfileAPI)
