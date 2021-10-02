import Style from '../Navbar.module.css';
import {NavLink} from 'react-router-dom';
import userAvatarPlaceholder from '../../../assets/images/avatar_type_0_1.png';
import React from 'react';
import {StateType, UserType} from '../../../types/types';
import loader from '../../../assets/images/loader.gif';
import {useSelector} from 'react-redux';

type FriendPropsType = {
    friend: UserType | undefined
}

type FriendsStylesType = {[key: number]: {[cssProp: string]: string}}

const styles: FriendsStylesType = {
    3: {width: '42px', margin: '5px'},
    6: {width: '38px', margin: '5px'},
    10: {width: '26px', margin: '3px'},
    18: {width: '22px', margin: '2px'}
}

export function Friend ({friend}: FriendPropsType) {

    const friendsAmount = useSelector((state: StateType) => state.pageUsers.maxFriendsDisplay)

    const responsiveStyle = {
        border: `2px solid ${friend && +friend.id === 2 ? 'gold' : 'white'}`,
        width: styles[friendsAmount].width,
        margin: styles[friendsAmount].margin,
        borderWidth: friendsAmount > 8 ? '1px' : '2px'
    }

    return <div className={Style.friend}>
        {friend
            ? <NavLink to={'/profile/' + friend.id}>
            <div className={Style.avatar}>
                <img className={Style.friendAvatar}
                     style={responsiveStyle}
                     src={friend.photos.large || userAvatarPlaceholder}
                     alt={friend.name}
                />
            </div>
        </NavLink>
        : <div className={Style.avatar} style={{position: 'relative', top: '0', left: '0'}}>
                <img className={Style.friendAvatar}
                     style={responsiveStyle}
                     src={loader}
                     alt={'loading...'}
                />
            </div>}
    </div>
}