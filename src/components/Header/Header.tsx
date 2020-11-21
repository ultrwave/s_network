import React from 'react';
import Style from './Header.module.css';

export function Header() {
    return (
        <header className={Style.header}>
            <img src="https://autodoktor.com.ua/wp-content/uploads/Logo/Total-logo-earth.png" alt="logo"/>
        </header>
    )
}