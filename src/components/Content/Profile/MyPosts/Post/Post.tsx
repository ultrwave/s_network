import React, {useEffect, useState} from 'react';
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
    isOwner: boolean
    editPost(postId: string, message: string): void
    deletePost(postId: string): void
    setMyLike(newLikes: number): void
}

export function Post(props: PropsType) {

    const avatar = props.avatar || profileAvatarPlaceholder

    let [editMode, setEditMode] = useState(false)
    let [likes, setPostLikes] = useState(props.likesCount)
    let [blockLikeButton, setBlockLikeButton] = useState(false)

    let rAFReference: number
    let progress = 0

    const addLikes = () => {
        const newLikes = 25
        if (blockLikeButton) return
        if (progress < newLikes) {
            setBlockLikeButton(true)
            setPostLikes(l => l + (props.myLike ? -1 : 1))
            progress++
            rAFReference = window.requestAnimationFrame(addLikes)
        } else {
            cancelAnimationFrame(rAFReference)
            props.setMyLike(newLikes)
            setBlockLikeButton(false)
        }
    }

    useEffect(() => {
        return cancelAnimationFrame(rAFReference)
    })

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
                    {(editMode && props.isOwner)
                        ? <div>
                            <button className={Style.toggleEditModeButton}
                                    onClick={() => setEditMode(false)}>
                                cancel
                            </button>
                            <button className={Style.toggleEditModeButton}
                                    onClick={() => props.deletePost(props.postId)}>
                                delete post
                            </button>
                            <EditPostReduxForm onSubmit={onSubmit}
                                               key={props.postId}
                                               form={props.postId}
                                               initialValues={{postMessage: props.message}}
                            />
                        </div>
                        : <div className={Style.message}>
                            <span>{props.message}</span>
                            {props.isOwner &&
                            <button className={Style.toggleEditModeButton}
                                    onClick={() => setEditMode(true)}>
                                edit
                            </button>}
                        </div>}
                </div>
            </div>
            <div className={Style.postFooter}>
                <span className={`${Style.likes} ${props.myLike ? Style.myLike : ''}`}
                      onClick={addLikes}>
                    Like ({likes} likes)
                </span>
                <span className={Style.postDate}>
                    {props.date}
                </span>
            </div>
        </div>
    )
}