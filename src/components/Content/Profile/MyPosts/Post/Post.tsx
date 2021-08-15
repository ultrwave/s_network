import React, {useState} from 'react';
import Style from './Post.module.css';
import profileAvatarPlaceholder from '../../../../../assets/images/profile_avatar_placeholder.jpg'
import EditPostReduxForm from './EditPostForm';
import {UserProfileType} from '../../../../../types/types';

type PropsType = {
    postId: string
    message: string
    likesCount: number
    myLike: boolean
    avatar: string | null
    date: string
    editPost(postId: string, message: string): void
    toggleMyLike(): void
}

export function Post(props: PropsType) {

    const avatar = props.avatar || profileAvatarPlaceholder

    let [editMode, setEditMode] = useState(false)

    const onSubmit = (formData: UserProfileType & any) => {
        props.editPost(props.postId, formData.postMessage)
        setEditMode(false)
    }

    return (
        <div className={Style.postItem}>
            <div className={Style.postHeader}>
                <img src={avatar}
                     alt="avatar"
                     className={Style.avatar}
                />
                <div className={Style.messageContainer}>
                    {editMode
                        ? <div>
                            <EditPostReduxForm onSubmit={onSubmit}
                                               key={props.postId}
                                               form={props.postId}
                                               initialValues={{postMessage: props.message}}
                            />
                            <span onClick={() => setEditMode(false)}> cancel</span>
                        </div>
                        : <div className={Style.message}>
                            <span>{props.message}</span>
                            <div onClick={() => setEditMode(true)}>
                                <i>edit</i>
                            </div>
                        </div>}
                </div>
            </div>
            <div className={Style.postFooter}>
                <span className={`${Style.likes} ${props.myLike ? Style.myLike : ''}`}
                      onClick={() => props.toggleMyLike()}>
                    Like ({props.likesCount + (props.myLike ? 1 : 0)} likes)
                </span>
                <span className={Style.postDate}>
                    {props.date}
                </span>
            </div>
        </div>
    )
}