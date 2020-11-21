import React from 'react';
import Style from './Navbar.module.css';


export function Navbar() {
    return (
        <nav className={Style.navbar}>
            <div className={Style.item}>
                <a href="#0">Profile</a>
            </div>
            <div className={Style.item}>
                <a href="#0">Messages</a>
            </div>
            <div className={Style.item}>
                <a href="#0">News</a>
            </div>
            <div className={Style.item}>
                <a href="#0">Music</a>
            </div>
            <div className={Style.item}>
                <a href="#0">Settings</a>
            </div>
        </nav>
    )
}