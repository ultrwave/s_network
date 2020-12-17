import React from 'react';
import Style from '../Profile.module.css';

type ProfileInfoProps = {
}

export function ProfileInfo(props: ProfileInfoProps) {

    return (
        <div>
            <div>
                <img src="http://www.imageonemri.ca/image/w2000-c5:2/files/58532088_l.jpg" alt="" className={Style.profileImg}/>
            </div>
            <div className={Style.description}>
                <span>Profile info</span>
                {console.log('rerender')}
            </div>
        </div>
    )
}


