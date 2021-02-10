import React, {ComponentType} from 'react';
import {Redirect} from 'react-router-dom';
import {StateType} from '../types/types';
import {MSTPIsAuthType} from '../components/Content/Profile/ProfileContainer';
import {connect} from 'react-redux';

const mapStateToPropsForRedirect = (state: StateType): MSTPIsAuthType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(WrappedComponent: ComponentType<T>) { // todo - ?

    function RedirectComponent(props: MSTPIsAuthType) {

        const {isAuth, ...restProps} = props

        return !props.isAuth ?
            <Redirect to='/login'/>
            : <WrappedComponent {...restProps as T} />

    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}


