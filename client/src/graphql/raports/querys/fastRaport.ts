import { gql } from 'apollo-boost';

export const FAST_RAPORT_QUERY = gql`
    query fastRaport(
        $brand: String!
        $model: String!
        $vinNumber: String
        $productionYear: String
        $mileage: String
        $color: String
        $description: String!
        $diagnosis: String!
        $estimate: [Estimate!]
        $comment: String
        $currency: String
    ) {
        fastRaport(
            fastRaportInput: {
                brand: $brand
                model: $model
                vinNumber: $vinNumber
                productionYear: $productionYear
                mileage: $mileage
                color: $color
                description: $description
                diagnosis: $diagnosis
                currency: $currency
                estimate: $estimate
                comment: $comment
            }
        )
    }
`;
