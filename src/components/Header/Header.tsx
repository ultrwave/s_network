import React from 'react';
import Style from './Header.module.css';

export function Header() {
    return (
        <header className={Style.header}>
            <img src="https://www.flaticon.com/svg/static/icons/svg/1649/1649063.svg" alt="logo"/>
            <div className={Style.loginBlock}></div>
        </header>
    )
}
