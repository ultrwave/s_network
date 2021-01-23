import React from 'react';
import Style from './Post.module.css';


type PropsType = {
    message: string
    likesCount: number
    avatar: string
}

export function Post(props: PropsType) {

    return (
        <div className={Style.item}>
            <img src={props.avatar}
                 alt="avatar"
                 className={Style.avatar}
            />
            <div className={Style.messageContainer}>
                <div className={Style.message}>
                    <span>{props.message}</span>
                </div>
                <div className={Style.likes}>
                    <span>Like ({props.likesCount} likes)</span>
                </div>
            </div>
        </div>
    )
}