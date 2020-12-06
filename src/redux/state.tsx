//======== TYPES ======================================================

export type DialogItemDataType = {
    id: number
    name: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}

//======== DATA ======================================================

const dialogItemData: Array<DialogItemDataType> = [
    {id: 1, name: 'Jane'},
    {id: 2, name: 'Tom'},
    {id: 3, name: 'Steve'},
    {id: 4, name: 'Jack'},
    {id: 5, name: 'Anna'}
]

const messagesData: Array<MessagesDataType> = [
    {id: 1, message: 'Hi!'},
    {id: 2, message: 'Hello!'},
    {id: 3, message: 'Whats up?'},
    {id: 4, message: 'Good day!'},
    {id: 5, message: 'Yo!'}
]

const postsData: Array<PostsDataType> = [
    {id: 1, message: 'It\'s my first post!', likesCount: 12},
    {id: 2, message: 'Hello!', likesCount: 432},
    {id: 3, message: 'Good day!', likesCount: 2}
]

//====================================================================

let state = {
    postsData: [...postsData],
    dialogItemData: [...dialogItemData],
    messagesData: [...messagesData]
}

export default state