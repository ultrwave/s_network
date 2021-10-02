import React from 'react';
import Style from './Navbar.module.css';
import {FriendsOnline} from './FriendsOnline/FriendsOnline';
import NavbarItem from './NavbarItem';

function Navbar() {

    return (
        <nav className={Style.navbar}>
            <div className={Style.navbarItems}>
                <NavbarItem to='/profile' title='Profile'/>
                <NavbarItem to='/dialogs' title='Dialogs'/>
                <NavbarItem to='/news' title='News'/>
                <NavbarItem to='/settings' title='Settings'/>
                <NavbarItem to='/users' title='Users'/>
            </div>
            <FriendsOnline/>
        </nav>
    )
}

export default Navbar