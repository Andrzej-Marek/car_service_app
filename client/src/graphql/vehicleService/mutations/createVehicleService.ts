import { gql } from 'apollo-boost';
import { VEHICLE_SERVICE_FRAGMENT } from '../fragments';

export const CREATE_VEHICLE_SERVICE = gql`
    mutation CreateVehicleService($createVehicleService: CreateVehicleServiceDto!) {
        createVehicleService(createVehicleService: $createVehicleService) {
            ...VehicleService
        }
    }
    ${VEHICLE_SERVICE_FRAGMENT}
`;
