import MainDashboardPage from './pages';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import CustomersPage from './pages/CustomersPage';
import i18n from '@/i18n';

interface Routes {
    key: number;
    path: RoutesEnum;
    name: string;
    component: () => JSX.Element;
    icon: any;
    routes: RoutesRoutes[];
}

interface RoutesRoutes {
    key: number;
    path: RoutesEnum;
    name: string;
    component: () => JSX.Element;
    icon: any;
}

export enum RoutesEnum {
    HOME_PAGE = '/',
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
    CLIENTS_PAGE = '/clients',
}

const { HOME_PAGE, CLIENTS_PAGE } = RoutesEnum;

export const routes: Routes[] = [
    {
        key: 1,
        path: HOME_PAGE,
        name: 'Main page',
        component: MainDashboardPage,
        icon: HomeOutlined,
        routes: [],
    },
    {
        key: 2,
        path: CLIENTS_PAGE,
        name: i18n.t('routes:CustomersPageName'),
        component: CustomersPage,
        icon: TeamOutlined,
        routes: [],
    },
];
