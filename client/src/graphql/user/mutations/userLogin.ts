import { gql } from 'apollo-boost';

export const USER_LOGIN_MUTATION = gql`
    mutation UserLogin($login: String!, $password: String!) {
        userLogin(credentials: { login: $login, password: $password }) {
            id
            name
            company {
                id
                plan
                companyName
            }
        }
    }
`;
