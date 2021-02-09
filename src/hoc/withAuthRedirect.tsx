import React from 'react';
import {Redirect} from 'react-router-dom';
import {StateType} from '../types/types';
import {MSTPFRType} from '../components/Content/Profile/ProfileContainer';
import {connect} from 'react-redux';

const mapStateToPropsForRedirect = (state: StateType): MSTPFRType => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component<any> {

        render() {
            return !this.props.isAuth ?
                <Redirect to='/login'/>
                : <Component {...this.props} />

        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}


