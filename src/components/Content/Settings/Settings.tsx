import React from 'react';
import Style from './Settings.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from '../../../types/types';
import {updateSettings} from '../../../redux/settings-reducer';

type PropsType = {

}

export function Settings(props: PropsType) {

    const dispatch = useDispatch()
    const settings = useSelector((state: StateType) => state.settings)

    const onPaginationChange = (pageSize: number) => {
        dispatch(updateSettings({setting: 'pagination', value: pageSize}))
    }

    return (
        <div className={Style.BLANK}>
            <h1>Settings</h1>
            <div className={Style.settingsList}>
                <span>{`Friends: 
                ${settings.friends.touched? settings.friends.value : '---'}`}</span>
                <span>{`Dialogs: 
                ${settings.dialogs.touched? settings.dialogs.value : '---'}`}</span>
                <span>{`Pagination: 
                ${settings.pagination.touched? settings.pagination.value : '---'}`}</span>
                <select value={settings.pagination.value}
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