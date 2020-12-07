import React from 'react';
import {NavLink} from 'react-router-dom';
import Style from './Navbar.module.css';

type NavbarItemPropsType = {
    to: string
    title: string
}

export function Navbar() {

    function NavbarItem(props: NavbarItemPropsType) {
        return (
            <div className={Style.item}>
                <NavLink to={props.to}
                         activeClassName={Style.activeLink}>
                    {props.title}
                </NavLink>
            </div>
        )
    }

    function FriendsOnline() {
        return (
            <div>
                <h2 className={Style.friendsTitle}>Friends online</h2>
                <div className={Style.friendsOnline}>
                    <div className={Style.friend}>
                        <div className={Style.friendAvatar}></div>
                        <span className={Style.friendName}>Joe</span>
                    </div>
                    <div className={Style.friend}>
                        <div className={Style.friendAvatar}></div>
                        <span className={Style.friendName}>Jack</span>
                    </div>
                    <div className={Style.friend}>
                        <div className={Style.friendAvatar}></div>
                        <span className={Style.friendName}>Jane</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <nav className={Style.navbar}>
            <div className={Style.navbarItems}>
                <NavbarItem to='/profile' title='Profile'/>
                <NavbarItem to='/dialogs' title='Dialogs'/>
                <NavbarItem to='/news' title='News'/>
                <NavbarItem to='/settings' title='Settings'/>
            </div>
            <FriendsOnline/>
        </nav>
    )
}