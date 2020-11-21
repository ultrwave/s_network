import React from 'react';
import Style from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';


export function Profile() {
    return (
        <div className={Style.content}>
            <div>
                <img src="http://www.imageonemri.ca/image/w2000-c5:2/files/58532088_l.jpg" alt="" className={Style.profileImg}/>
            </div>
            <div>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
}