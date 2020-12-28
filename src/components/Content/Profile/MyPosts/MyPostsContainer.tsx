import React from 'react';
import {Post} from './Post/Post';
import {ActionTypes, PostsDataType, StoreType} from '../../../../redux/store';
import {addPostAC, updateNewPostTextAC} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import StoreContext from '../../../../StoreContext';

type MyPostsType = {
    postsData: Array<PostsDataType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

export function MyPostsContainer() {

    return (
        <StoreContext.Consumer>
            { (store: StoreType) => {

                const addPost = (ref: any) => {
                    let text = ref.current?.value
                    if (text && text.trim()) {
                        store.dispatch(addPostAC())
                        if (ref.current && ref.current.value) {
                            ref.current.focus()
                        }
                    }
                }

                const inputHandler = (text: string) => {
                    store.dispatch(updateNewPostTextAC(text))
                }

                const posts = store.getState().pageProfile.postsData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

                return (
                    <MyPosts
                        posts={posts}
                        inputHandler={inputHandler}
                        newPostText={store.getState().pageProfile.newPostText}
                        addPost={addPost}
                    />
                )
            }
        }
        </StoreContext.Consumer>
    )
}