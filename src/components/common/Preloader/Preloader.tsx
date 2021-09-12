import Style from './Preloader.module.css';
import preloader from '../../../assets/images/loader.gif';
import React from 'react';

export function Preloader() { // todo - smooth animation
    return <img className={Style.preloader}
                src={preloader}
                alt="Fetching..."/>
}