import gql from 'graphql-tag';

export const VEHICLE_SERVICE_FRAGMENT = gql`
    fragment VehicleService on VehicleService {
        id
        date
        currency
        serviceNumber
        estimateServiceDone
        netPrices
        description
        privateDescription
        deposit
        costs {
            price
            name
            amount
        }
    }
`;
