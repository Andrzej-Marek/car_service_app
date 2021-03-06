import gql from 'graphql-tag';
import { CUSTOMER_FRAGMENT } from '@/graphql/customer/fragments';

export const VEHICLE_FRAGMENT = gql`
    fragment Vehicle on Vehicle {
        id
        vehicleType
        brand
        model
        vinNumber
        productionYear
        engineCapacity
        registrationNumber
        enginePower
        color
        mileage
        fuelType
        insuranceDate
        nextService
        warranty
        comment
        imageUrl
        lengthUnit
        customer {
            ...Customer
        }
    }

    ${CUSTOMER_FRAGMENT}
`;
