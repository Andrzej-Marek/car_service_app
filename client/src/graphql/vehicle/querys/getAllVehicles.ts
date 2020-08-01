import gql from 'graphql-tag';
import { VEHICLE_FRAGMENT } from '../fragments';

export const GET_ALL_VEHICLES = gql`
    query getAllVehicles {
        getAllVehicles {
            ...Vehicle
        }
    }

    ${VEHICLE_FRAGMENT}
`;
