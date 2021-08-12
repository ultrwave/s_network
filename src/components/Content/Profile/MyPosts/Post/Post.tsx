import React from 'react';
import Style from './Post.module.css';
import profileAvatarPlaceholder from '../../../../../assets/images/profile_avatar_placeholder.jpg'

type PropsType = {
    message: string
    likesCount: number
    myLike: boolean
    avatar: string | null
    toggleMyLike(): void
}

export function Post(props: PropsType) {

    const avatar = props.avatar || profileAvatarPlaceholder

    return (
        <div className={Style.item}>
            <img src={avatar}
                 alt="avatar"
                 className={Style.avatar}
            />
            <div className={Style.messageContainer}>
                <div className={Style.message}>
                    <span>{props.message}</span>
                </div>
                <div className={`${Style.likes} ${props.myLike? Style.myLike : ''}`}>
                    <span onClick={() => props.toggleMyLike()}>
                        Like ({props.likesCount + (props.myLike? 1 : 0)} likes)
                    </span>
                </div>
            </div>
        </div>
    )
}