import React from 'react';
import Style from './Post.module.css';

type PropsType = {
    message: string;
    likesCount: number;
}

export function Post(props: PropsType) {
    return (
        <div className={Style.item}>
            <img src="https://www.teenvio.com/es/wp-content/uploads/2018/03/man-2-512.png" alt="avatar"/>
            <span>{props.message}</span>
            <div>
                <span>Like ({props.likesCount} likes)</span>
            </div>
        </div>
    )
}