import React from 'react';
import Style from './Header.module.css';
import {NavLink} from 'react-router-dom';

export function Header(props: any) {
    return (
        <header className={Style.header}>
            <img src="https://www.flaticon.com/svg/static/icons/svg/1649/1649063.svg" alt="logo"/>
            <div className={Style.loginBlock}>
                {props.isAuth ? props.login :
                    <NavLink to={'login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}
