import gql from 'graphql-tag';
import { VEHICLE_SERVICE_FRAGMENT } from '../fragments';

export const GET_VEHICLE_SERVICE = gql`
    query getVehicleServices($vehicleId: String!) {
        getVehicleServices(vehicleId: $vehicleId) {
            ...VehicleService
        }
    }

    ${VEHICLE_SERVICE_FRAGMENT}
`;
