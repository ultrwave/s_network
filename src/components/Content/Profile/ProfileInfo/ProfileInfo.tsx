import React, {useState} from 'react';
import Style from '../Profile.module.css';

type ProfileInfoProps = {
    animation: (f: string) => void
    frame: string
}

export function ProfileInfo(props: ProfileInfoProps) {

    const animFrame = props.frame

    const frames = () => {
        let newFrame
        if (animFrame === 'Profile') {
            newFrame = 'P rofile'
        } else if (animFrame === 'P rofile') {
            newFrame = 'P r ofile'
        } else if (animFrame === 'P r ofile') {
            newFrame = 'P r o file'
        } else if (animFrame === 'P r o file') {
            newFrame = 'P r o f ile'
        } else if (animFrame === 'P r o f ile') {
            newFrame = 'P r o f i le'
        } else if (animFrame === 'P r o f i le') {
            newFrame = 'P r o f i l e'
        } else {
            newFrame = 'Profile'
        }
        return newFrame
    }

    props.animation(frames())

    return (
        <div>
            <div>
                <img src="http://www.imageonemri.ca/image/w2000-c5:2/files/58532088_l.jpg" alt="" className={Style.profileImg}/>
            </div>
            <div className={Style.description}>
                <span>{animFrame}</span>
                {console.log('rerender')}
            </div>
        </div>
    )
}


