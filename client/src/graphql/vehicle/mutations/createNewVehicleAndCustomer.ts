import { gql } from 'apollo-boost';

export const CREATE_NEW_VEHICLE_AND_CUSTOMER = gql`
    mutation CreateNewVehicleWithCustomer(
        $addVehicle: CreateNewVehicleInput!
        $addCustomer: CreateCustomerInput!
        $vehicleImage: Upload
    ) {
        createNewVehicleWithCustomer(
            createNewVehicleAndCustomerInput: { addVehicle: $addVehicle, addCustomer: $addCustomer }
            vehicleImage: $vehicleImage
        ) {
            id
        }
    }
`;
