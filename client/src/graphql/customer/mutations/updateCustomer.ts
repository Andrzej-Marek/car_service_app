import gql from 'graphql-tag';
import { CUSTOMER_FRAGMENT } from '../fragments';

export const UPDATE_CUSTOMER = gql`
    mutation updateCustomer(
        $id: String!
        $firstname: String!
        $lastname: String
        $companyName: String
        $vatNumber: String
        $street: String
        $postcode: String
        $adress: String
        $phone: String
        $mail: String
        $comment: String
        $discount: Int
        $mailSendAgreement: Boolean!
        $smsSendAgreement: Boolean!
        $marketingSendAgreement: Boolean!
    ) {
        updateCustomer(
            updateCustomerInput: {
                id: $id
                firstname: $firstname
                lastname: $lastname
                companyName: $companyName
                vatNumber: $vatNumber
                street: $street
                postcode: $postcode
                adress: $adress
                phone: $phone
                mail: $mail
                comment: $comment
                discount: $discount
                mailSendAgreement: $mailSendAgreement
                smsSendAgreement: $smsSendAgreement
                marketingSendAgreement: $marketingSendAgreement
            }
        ) {
            ...Customer
        }
    }

    ${CUSTOMER_FRAGMENT}
`;
