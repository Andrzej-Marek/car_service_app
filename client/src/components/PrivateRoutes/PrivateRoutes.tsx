import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { RoutesEnum } from '@/Routes';

interface OwnProps {
    auth: boolean;
    component: any;
}

type Props = OwnProps & RouteProps;

const { LOGIN_PAGE } = RoutesEnum;

export const PrivateRoute: FC<Props> = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => (auth ? <Component {...props} /> : <Redirect to={LOGIN_PAGE} />)} />
);
