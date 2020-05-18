import i18n from '@/i18n';
import MainDashboardPage from './pages';
import { HomeOutlined, TeamOutlined, CarOutlined, AppstoreAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CustomersPage from './pages/CustomersPage';
import AddNewCarPage from './pages/AddNewVehicleWithCustomerPage';
import VehiclesPage from './pages/VehiclesPage';
import NewServicePage from './pages/NewServicePage';

interface Routes {
    key: string;
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
    VEHICLES_PAGE = '/vehicles',
    ADD_NEW_CAR_PAGE = '/new-car',
    NEW_SERVICE_PAGE = '/new-service',
}

const { HOME_PAGE, CLIENTS_PAGE, ADD_NEW_CAR_PAGE, VEHICLES_PAGE, NEW_SERVICE_PAGE } = RoutesEnum;

export const routes: Routes[] = [
    {
        key: '1',
        path: HOME_PAGE,
        name: i18n.t('routes:HomePageName'),
        component: MainDashboardPage,
        icon: HomeOutlined,
        routes: [],
    },
    {
        key: '2',
        path: CLIENTS_PAGE,
        name: i18n.t('routes:CustomersPageName'),
        component: CustomersPage,
        icon: TeamOutlined,
        routes: [],
    },
    {
        key: '3',
        path: VEHICLES_PAGE,
        name: i18n.t('routes:VehiclesPageName'),
        component: VehiclesPage,
        icon: CarOutlined,
        routes: [],
    },
    {
        key: '4',
        path: ADD_NEW_CAR_PAGE,
        name: i18n.t('routes:AddNewCarPageName'),
        component: AddNewCarPage,
        icon: AppstoreAddOutlined,
        routes: [],
    },
    {
        key: '5',
        path: NEW_SERVICE_PAGE,
        name: i18n.t('routes:NewServicePageName'),
        component: NewServicePage,
        icon: PlusCircleOutlined,
        routes: [],
    },
];
