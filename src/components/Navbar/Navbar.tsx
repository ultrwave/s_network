import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Navbar.module.css';


export function Navbar() {
    return (
        <nav className={Style.navbar}>
            <div className={Style.item}>
                <NavLink to="/profile" activeClassName={Style.activeLink}>Profile</NavLink>
            </div>
            <div className={Style.item}>
                <NavLink to="/dialogs" activeClassName={Style.activeLink}>Messages</NavLink>
            </div>
            <div className={Style.item}>
                <NavLink to="/news" activeClassName={Style.activeLink}>News</NavLink>
            </div>
            <div className={Style.item}>
                <NavLink to="/music" activeClassName={Style.activeLink}>Music</NavLink>
            </div>
            <div className={Style.item}>
                <NavLink to="/settings" activeClassName={Style.activeLink}>Settings</NavLink>
            </div>
        </nav>
    )
}