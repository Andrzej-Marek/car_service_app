import gql from 'graphql-tag';
import { CUSTOMER_FRAGMENT } from '@/graphql/customer/fragments';
import { VEHICLE_FRAGMENT } from '../fragments';

export const GET_ALL_VEHICLES = gql`
    query getAllVehicles {
        getAllVehicles {
            ...Vehicle
            customer {
                ...Customer
            }
        }
    }

    ${VEHICLE_FRAGMENT}
    ${CUSTOMER_FRAGMENT}
`;
