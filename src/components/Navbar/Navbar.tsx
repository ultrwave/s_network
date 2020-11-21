import React from 'react';
import Style from './Navbar.module.css';


export function Navbar() {
    return (
        <nav className={Style.navbar}>
            <div className={Style.item}>
                <a href="/profile">Profile</a>
            </div>
            <div className={Style.item}>
                <a href="/dialogs">Messages</a>
            </div>
            <div className={Style.item}>
                <a href="/news">News</a>
            </div>
            <div className={Style.item}>
                <a href="/music">Music</a>
            </div>
            <div className={Style.item}>
                <a href="/settings">Settings</a>
            </div>
        </nav>
    )
}