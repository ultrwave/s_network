import React from 'react';
import Style from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../../types/types';
import {Redirect} from 'react-router-dom';

type PageProfilePropsType = { // todo - тут вообще должны быть пропсы?
    profile: UserProfileType | null
    isAuth: boolean
}

export function Profile(props:PageProfilePropsType) {

    if (!props.isAuth) return <Redirect to='/login'/>

    return (
        <div className={Style.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}