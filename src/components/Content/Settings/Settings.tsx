import React from 'react';
import Style from './Settings.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from '../../../types/types';
import {setItemsOnPage, setLatestFriendsMode, setMaxFriendsDisplay} from '../../../redux/users-reducer';

type PropsType = {}

export function Settings(props: PropsType) { // todo - themes switching; AntDesign / Material

    const dispatch = useDispatch()

    const usersPageSize = useSelector((state: StateType) => state.pageUsers.itemsOnPage)
    const friendsOnlineAmount = useSelector((state: StateType) => state.pageUsers.maxFriendsDisplay)
    const friendsSettings = useSelector((state: StateType) => state.pageUsers.showLatestFriends)

    const onFriendsModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLatestFriendsMode({latestFriends: e.target.value === 'latest'}))
    }

    const onFriendsAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMaxFriendsDisplay({friendsAmount: Number(e.currentTarget.value)}))
    }

    const onPaginationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setItemsOnPage({itemsOnPage: Number(e.currentTarget.value)}))
    }

    return (
        <div className={Style.BLANK}>
            <h1>Settings</h1>
            <div className={Style.settingsList}>
                <div className={Style.settingsSection}>
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
                    <div className={Style.selectOption}>
                        <span>{`Friends online amount: ${friendsOnlineAmount}`}</span>
                        <select value={friendsOnlineAmount}
                                onChange={onFriendsAmountChange}>
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </div>
                </div>
                <div className={Style.settingsSection}>
                    <span>{`Dialogs: --- `}</span>
                </div>
                <div className={Style.settingsSection}>
                    <div className={Style.selectOption}>
                        <span>{`Users per page display: ${usersPageSize}`}</span>
                        <select value={usersPageSize}
                                onChange={onPaginationChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}