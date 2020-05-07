import gql from 'graphql-tag';
import { CUSTOMER_FRAGMENT } from '../fragments';

export const GET_ALL_CUSTOMERS = gql`
    query getAllCustomers {
        getAllCustomers {
            ...Customer
        }
    }
    ${CUSTOMER_FRAGMENT}
`;
