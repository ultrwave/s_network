import {ActionTypes, AppThunk} from '../types/types';

const UPDATE_SETTINGS = 'sn01/settings/UPDATE_SETTINGS'
const INIT_SETTING = 'sn01/settings/INIT_SETTING'

type PageStateType = {
    pagination: {touched: boolean, value: number}
    dialogs: {touched: boolean, value: boolean}
    friends: {touched: boolean, value: boolean}
}

type SettingNamesType = 'pagination' | 'dialogs' | 'friends'

let initialState = {
    pagination: {touched: false, value: 10},
    dialogs: {touched: false, value: false},
    friends: {touched: false, value: false}
}

const settingsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case UPDATE_SETTINGS:
            const value = action.payload.value
            return {...state, [action.payload.setting]: {touched: true, value}}

        case INIT_SETTING:
            const newState = {...state}
            newState[action.payload.setting].touched = false
            return newState

        default:
            return state
    }
}

export const updateSettings = (payload: {setting: SettingNamesType, value: number | boolean}) => {
    return {type: UPDATE_SETTINGS, payload} as const
}

export const initSetting = (payload: {setting: SettingNamesType}) => {
    return {type: INIT_SETTING, payload} as const
}

// Thunks

export const synchronizeSettings = (setting: SettingNamesType, value: number | boolean): AppThunk => (dispatch) => {

}

export default settingsReducer