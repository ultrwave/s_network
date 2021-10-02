import React from 'react';
import {NavLink} from 'react-router-dom';
import Style from './Navbar.module.css';
import {FriendsOnline} from './FriendsOnline/FriendsOnline';

type NavbarItemPropsType = {
    to: string
    title: string
}

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


export default NavbarItem