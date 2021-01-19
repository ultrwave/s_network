import React from 'react';
import Style from '../Profile.module.css';
import {Preloader} from '../../../common/Preloader/Preloader';
import {UserProfileType} from '../../../../types/types';

type ProfileInfoProps = {
    profile: UserProfileType | null
}

export function ProfileInfo(props: ProfileInfoProps) {

    if (!props.profile) {
        return <Preloader/>
    }

    const userAvatarSrc: string = props.profile.photos.large ? props.profile.photos.large : 'placeholderUrl' // todo - добавить плейсхолдер

    return (
        <div>
            <div>
                <img src="http://www.imageonemri.ca/image/w2000-c5:2/files/58532088_l.jpg" alt="" className={Style.profileImg}/>
            </div>
            <div className={Style.description}>
                <span>
                    <img src={userAvatarSrc} alt="User avatar"/>
                </span>
            </div>
        </div>
    )
}


