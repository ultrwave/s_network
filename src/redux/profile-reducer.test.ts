import profileReducer, {addPost, defaultUser, deletePost} from './profile-reducer';
import {v1} from 'uuid';

let state = {
    profile: defaultUser,
    postsData: {'testUserId': [
        {postId: v1(), message: 'It\'s my first post!',
            likesCount: 12, myLike: true, date: '1/10/2021, 00:00:03'},
        {postId: v1(), message: 'Hello!',
            likesCount: 432, myLike: true, date: '1/10/2021, 00:00:02'},
        {postId: v1(), message: 'Good day!',
            likesCount: 2, myLike: true, date: '1/10/2021, 00:00:01'}
    ]},
    status: '',
    isOwner: true
}

test('posts length should be incremented', () => {
    // 1. test data
    let action = addPost({userId: 'testUserId', message: 'new post added (test)'})

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData['testUserId'].length).toBe(4)
});

test('last post text must be correct', () => {
    // 1. test data
    let action = addPost({userId: 'testUserId', message: 'TEST ### ADDING NEW POST ### TEST'})

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData['testUserId'][0].message).toBe('TEST ### ADDING NEW POST ### TEST')
});

test('after deleting length of messages should be decremented', () => {
    // 1. test data
    let action = deletePost({userId: 'testUserId', postId: state.postsData['testUserId'][0].postId})

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData['testUserId'].length).toBe(2)
});

test('after deleting length should not decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost({userId: 'testUserId', postId: 'wrongId'})

    //2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData['testUserId'].length).toBe(3)
});

