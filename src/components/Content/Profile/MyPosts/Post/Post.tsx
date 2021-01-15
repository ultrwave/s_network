import React from 'react';
import Style from './Post.module.css';

type PropsType = {
    message: string;
    likesCount: number;
}

export function Post(props: PropsType) {
    return (
        <div className={Style.item}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-371-456323.png"
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