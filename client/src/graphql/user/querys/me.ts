import { gql } from 'apollo-boost';

export const ME = gql`
    query me {
        me {
            companyId
            companyName
            loginType
            plan
            userName
        }
    }
`;
