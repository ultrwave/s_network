import React from 'react';
import Style from './Settings.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from '../../../types/types';
import {setItemsOnPage, setLatestFriendsMode} from '../../../redux/users-reducer';

type PropsType = {

}

export function Settings(props: PropsType) {

    const dispatch = useDispatch()

    const usersPageSize = useSelector((state: StateType) => state.pageUsers.itemsOnPage)
    const friendsSettings = useSelector((state: StateType) => state.pageUsers.showLatestFriends)

    const onFriendsModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLatestFriendsMode({latestFriends: e.target.value === 'latest'}))
    }

    const onPaginationChange = (itemsOnPage: number) => {
        dispatch(setItemsOnPage({itemsOnPage}))
    }

    return (
        <div className={Style.BLANK}>
            <h1>Settings</h1>
            <div className={Style.settingsList}>
                <div>
                    <span>{`Friends display mode:`}</span>
                    <span>
                        <input onChange={onFriendsModeChange}
                                 type="radio"
                                 name={'friendsSettings'}
                                 value={'latest'}
                                 checked={friendsSettings}/>
                        latest</span>
                    <span>
                        <input onChange={onFriendsModeChange}
                                 type="radio"
                                 name={'friendsSettings'}
                                 value={'random'}
                                 checked={!friendsSettings}/>
                        random</span>
                </div>
                <span>{`Dialogs: --- `}</span>
                <span>{`Users per page display: ${usersPageSize}`}</span>
                <select value={usersPageSize}
                        onChange={e => {onPaginationChange(Number(e.currentTarget.value))}}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    )
}