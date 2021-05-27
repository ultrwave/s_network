import profileReducer, {addPost, defaultUser, deletePost} from './profile-reducer';
import {v1} from 'uuid';

let state = {
    profile: defaultUser,
    postsData: [
        {id: v1(), message: 'It\'s my first post!', likesCount: 12},
        {id: v1(), message: 'Hello!', likesCount: 432},
        {id: v1(), message: 'Good day!', likesCount: 2}
    ],
    status: ''
}

test('posts length should be incremented', () => {
    // 1. test data
    let action = addPost('new post added (test)')

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData.length).toBe(4)
});

test('last post text must be correct', () => {
    // 1. test data
    let action = addPost('TEST ### ADDING NEW POST ### TEST')

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData[0].message).toBe('TEST ### ADDING NEW POST ### TEST')
});

test('after deleting length of messages should be decremented', () => {
    // 1. test data
    let action = deletePost(state.postsData[0].id)

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData.length).toBe(2)
});

test('after deleting length should not decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost('wrongId')

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData.length).toBe(3)
});