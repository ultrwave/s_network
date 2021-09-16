import React from 'react';
import Style from './Settings.module.css';
import {useSelector} from 'react-redux';
import {StateType} from '../../../types/types';

type PropsType = {

}

export function Settings(props: PropsType) {

    const settings = useSelector((state: StateType) => state.settings)

    return (
        <div className={Style.BLANK}>
            <h1>Settings</h1>
            <div className={Style.settingsList}>
                <span>{`Friends: ${settings.friends.value}`}</span>
                <span>{`Dialogs: ${settings.dialogs.value}`}</span>
                <span>{`Pagination: ${settings.pagination.value}`}</span>
            </div>
        </div>
    )
}