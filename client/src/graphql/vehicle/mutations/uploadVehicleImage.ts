import gql from 'graphql-tag';

export const UPLOAD_VEHICLE_IMAGE = gql`
    mutation uploadVehicleImage($file: Upload!, $vehicleId: String!) {
        uploadVehicleImage(file: $file, vehicleId: $vehicleId)
    }
`;
