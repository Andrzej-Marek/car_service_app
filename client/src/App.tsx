import React, { FunctionComponent, Fragment, useState, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes, RoutesEnum } from './Routes';
import LoginPage from './pages/LoginPage';
import LayoutProvider from './components/Layout';
import { GlobalStyle } from '@/utils';
import { UserContext } from './context/UserContext/UserContext';
import { User } from './@types';

const { LOGIN_PAGE } = RoutesEnum;

const App: FunctionComponent = () => {
    const [user, setUser] = useState<User | null>(null);

    const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    const routeComponents = routes.map(({ path, component, routes, key }) => (
        <Fragment key={key}>
            <Route exact path={path} component={component} key={key} />
            {routes.map(route => (
                <Route exact path={route.path} component={route.component} key={key} />
            ))}
        </Fragment>
    ));

    return (
        <UserContext.Provider value={userValue}>
            <GlobalStyle />
            <Switch>
                <Route path={LOGIN_PAGE} component={LoginPage} />
                <LayoutProvider>{routeComponents}</LayoutProvider>
            </Switch>
        </UserContext.Provider>
    );
};

export default App;
