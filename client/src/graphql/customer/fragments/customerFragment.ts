import gql from 'graphql-tag';

export const CUSTOMER_FRAGMENT = gql`
    fragment Customer on Customer {
        id
        firstname
        lastname
        companyName
        adress
        companyName
        vatNumber
        street
        postcode
        phone
        mailSendAgreement
        smsSendAgreement
        marketingSendAgreement
        mail
        discount
        comment
    }
`;
