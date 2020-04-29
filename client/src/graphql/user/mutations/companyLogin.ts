import { gql } from 'apollo-boost';

export const COMPANY_LOGIN_MUTATION = gql`
    mutation CompanyLogin($login: String!, $password: String!) {
        companyLogin(credentials: { login: $login, password: $password }) {
            id
            plan
            companyName
        }
    }
`;
