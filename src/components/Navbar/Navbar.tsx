import React from 'react';
import {NavLink} from 'react-router-dom';
import Style from './Navbar.module.css';
import {FriendsOnline} from './FriendsOnline/FriendsOnline';

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