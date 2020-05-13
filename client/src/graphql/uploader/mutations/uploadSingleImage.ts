import gql from 'graphql-tag';

export const UPLOAD_SINGLE_IMAGE_MUTATION = gql`
    mutation UploadSingleImage($image: Upload!) {
        uploadSingleImage(image: $image)
    }
`;
