import { gql } from 'apollo-boost';

export const CREATE_NEW_CUSTOMER = gql`
    mutation CreateNewCustomer(
        $name: String!
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
        createNewCustomer(
            newCustomerInput: {
                name: $name
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
            id
            name
        }
    }
`;
