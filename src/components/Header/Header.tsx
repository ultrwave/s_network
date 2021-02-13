import React from 'react';
import Style from './Header.module.css';
import {NavLink} from 'react-router-dom';
import siteLogoPlaceholder from '../../assets/images/siteLogoPlaceholder_0.svg'

type HeaderPropsType = {
    login: string
    isAuth: boolean
}

export function Header(props: HeaderPropsType) {
    return (
        <header className={Style.header}>
            <img src={siteLogoPlaceholder} alt="logo"/>
            <div className={Style.loginBlock}>
                {props.isAuth ? props.login :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}
