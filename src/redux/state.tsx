import {v1} from 'uuid';


//======== TYPES ======================================================


export type DialogItemType = {
    id: string
    name: string
}

export type MessageDataType = {
    id: string
    isMine: boolean
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

const dialogItems: Array<DialogItemType> = [
    {id: dialogItemId1, name: 'Jane'},
    {id: dialogItemId2, name: 'Tom'},
    {id: dialogItemId3, name: 'Steve'},
    {id: dialogItemId4, name: 'Jack'},
]

const dialogMessagesData1: Array<MessageDataType> = [
    {id: v1(), isMine: true, message: 'Hi!'},
    {id: v1(), isMine: false, message: 'Hello!'},
    {id: v1(), isMine: true, message: 'Whats up?'},
    {id: v1(), isMine: true, message: 'Good day!'},
    {id: v1(), isMine: false, message: 'Yo!'}
]
const dialogMessagesData2: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Apple'},
    {id: v1(), isMine: true, message: 'Peanut'},
    {id: v1(), isMine: false, message: 'Banana'},
    {id: v1(), isMine: true, message: 'Peach'},
]
const dialogMessagesData3: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Tomato'},
    {id: v1(), isMine: false, message: 'Cucumber'},
    {id: v1(), isMine: true, message: 'Carrot'},
]
const dialogMessagesData4: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Winter'},
    {id: v1(), isMine: false, message: 'Spring'},
]

const dialogsData: any = { // type?
     [dialogItemId1]: dialogMessagesData1,
     [dialogItemId2]: dialogMessagesData2,
     [dialogItemId3]: dialogMessagesData3,
     [dialogItemId4]: dialogMessagesData4
}


const postsData: Array<PostsDataType> = [
    {id: v1(), message: 'It\'s my first post!', likesCount: 12},
    {id: v1(), message: 'Hello!', likesCount: 432},
    {id: v1(), message: 'Good day!', likesCount: 2}
]

//====================================================================

let state = {
    postsData: [...postsData],
    dialogsData: dialogsData,
    dialogItems: [...dialogItems],
    // messagesData: [...messagesData]
}

export default state