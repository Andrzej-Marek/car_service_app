import { gql } from 'apollo-boost';

export const GET_ALL_CUSTOMERS = gql`
    query getAllCustomers {
        getAllCustomers {
            id
            firstname
            lastname
            companyName
            adress
        }
    }
`;
