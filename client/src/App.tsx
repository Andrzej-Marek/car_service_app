import React, { FunctionComponent, Fragment, useState, useMemo, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { routes, RoutesEnum } from './Routes';
import LoginPage from './pages/LoginPage';
import LayoutProvider from './components/Layout';
import { GlobalStyle } from '@/utils';
import { UserContext } from './context/UserContext/UserContext';
import { User } from './@types';
import { PrivateRoute } from './components/PrivateRoutes';
import { useQuery } from '@apollo/react-hooks';
import { ME } from './graphql/user/querys/me';
import { MeQuery } from './generated/graphql';

const { LOGIN_PAGE } = RoutesEnum;

const App: FunctionComponent = () => {
    const [user, setUser] = useState<User | null>(null);
    const { data, loading } = useQuery<MeQuery>(ME);

    useEffect(() => {
        if (data) {
            const { companyId, companyName, loginType, plan, userName } = data.me;
            setUser({ companyId, companyName, loginType, plan, userName } as User);
        }
    }, [data]);

    const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    const routeComponents = routes.map(({ path, component, routes, key }) => (
        <Fragment key={key}>
            <PrivateRoute exact path={path} component={component} key={key} auth={!!user || !!data} />
            {routes.map(route => (
                <PrivateRoute exact path={route.path} component={route.component} key={key} auth={!!user || !!data} />
            ))}
        </Fragment>
    ));

    if (loading) return <div>Loading...</div>;
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
