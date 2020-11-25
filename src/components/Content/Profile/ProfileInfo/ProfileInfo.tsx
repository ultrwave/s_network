import React from 'react';
import Style from '../Profile.module.css';

export function ProfileInfo() {
    return (
        <div>
            <div>
                <img src="http://www.imageonemri.ca/image/w2000-c5:2/files/58532088_l.jpg" alt="" className={Style.profileImg}/>
            </div>
            <div className={Style.description}>
                ava + description
            </div>
        </div>
    )
}


