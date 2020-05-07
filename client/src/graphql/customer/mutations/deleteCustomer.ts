import gql from 'graphql-tag';

export const DELETE_CUSTOMER = gql`
    mutation deleteCustomer($customerId: String!) {
        deleteCustomer(customerId: $customerId)
    }
`;
