import Style from './Preloader.module.css';
import preLoader from '../../../assets/images/loaderB.svg';
import React from 'react';
import {useSelector} from 'react-redux';
import {StateType} from '../../../types/types';

export function Preloader() { // todo - smooth animation

    const fadeOut = useSelector((state: StateType) => state.app.initialized)

    return (
        <div className={`${Style.dimScreen} ${fadeOut ? Style.hideLoader: ''}`}>
            <img className={Style.preLoader}
                 src={preLoader}
                 alt="Fetching..."/>
        </div>
    )
}