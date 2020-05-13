import gql from 'graphql-tag';

export const REMOVE_SINGLE_IMAGE_MUTATION = gql`
    mutation RemoveSingleImage($imageUrl: String!) {
        removeSingleImage(imageUrl: $imageUrl)
    }
`;
