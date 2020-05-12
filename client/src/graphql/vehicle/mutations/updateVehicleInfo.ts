import { gql } from 'apollo-boost';
import { VEHICLE_FRAGMENT } from '../fragments';

export const UPDATE_VEHICLE_INFO = gql`
    mutation UpdateVehicleInfo($updateVehicle: UpdateVehicleInput!, $image: Upload) {
        updateVehicleInfo(updateVehicle: $updateVehicle, image: $image) {
            ...Vehicle
        }
    }

    ${VEHICLE_FRAGMENT}
`;
