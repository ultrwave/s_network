import {v1} from 'uuid';


//======== TYPES ======================================================

export type DialogItemDataType = {
    id: string
    name: string
}

export type MessagesDataType = {
    id: string
    senderIsMe: boolean
    message: string
}

export type PostsDataType = {
    id: string
    message: string
    likesCount: number
}

//======== DATA ======================================================

const dialogItemId1 = v1()
const dialogItemId2 = v1()
const dialogItemId3 = v1()
const dialogItemId4 = v1()

const dialogItemData: Array<DialogItemDataType> = [
    {id: dialogItemId1, name: 'Jane'},
    {id: dialogItemId2, name: 'Tom'},
    {id: dialogItemId3, name: 'Steve'},
    {id: dialogItemId4, name: 'Jack'},
]

const dialogMessagesData1: Array<MessagesDataType> = [
    {id: v1(), senderIsMe: true, message: 'Hi!'},
    {id: v1(), senderIsMe: false, message: 'Hello!'},
    {id: v1(), senderIsMe: true, message: 'Whats up?'},
    {id: v1(), senderIsMe: true, message: 'Good day!'},
    {id: v1(), senderIsMe: false, message: 'Yo!'}
]
const dialogMessagesData2: Array<MessagesDataType> = [
    {id: v1(), senderIsMe: false, message: 'Apple'},
    {id: v1(), senderIsMe: true, message: 'Peanut'},
    {id: v1(), senderIsMe: false, message: 'Banana'},
    {id: v1(), senderIsMe: true, message: 'Peach'},
]
const dialogMessagesData3: Array<MessagesDataType> = [
    {id: v1(), senderIsMe: false, message: 'Tomato'},
    {id: v1(), senderIsMe: false, message: 'Cucumber'},
    {id: v1(), senderIsMe: true, message: 'Carrot'},
]
const dialogMessagesData4: Array<MessagesDataType> = [
    {id: v1(), senderIsMe: false, message: 'Winter'},
    {id: v1(), senderIsMe: false, message: 'Spring'},
]

const dialogsData: Array<Object> = [
    { [dialogItemId1]: dialogMessagesData1 },
    { [dialogItemId2]: dialogMessagesData2 },
    { [dialogItemId3]: dialogMessagesData3 },
    { [dialogItemId4]: dialogMessagesData4 }
]


const postsData: Array<PostsDataType> = [
    {id: v1(), message: 'It\'s my first post!', likesCount: 12},
    {id: v1(), message: 'Hello!', likesCount: 432},
    {id: v1(), message: 'Good day!', likesCount: 2}
]

//====================================================================

let state = {
    postsData: [...postsData],
    dialogsData: [...dialogsData]
    // dialogItemData: [...dialogItemData],
    // messagesData: [...messagesData]
}

export default state