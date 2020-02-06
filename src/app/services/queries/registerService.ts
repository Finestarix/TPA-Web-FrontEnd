import gql from 'graphql-tag';

export const getPhoneCode = gql`
    query getPhoneCode {
        AllPhoneCode {
            country
            code
        }
    }
`;

export const insertNewUser = gql`
    mutation insertNewUser($firstNameData: String!, $lastNameData: String!, $emailData: String!,
        $phoneCodeData: String!, $phoneData: String!, $passwordData: String!, $imageDate: String!) {
        InsertNewUser(firstname: $firstNameData, lastname: $lastNameData, email: $emailData, phonecode: $phoneCodeData, phone: $phoneData, password: $passwordData, image: $imageData){
            id
            image
            firstname
            lastname
            email
            phone
        }
    }
`;
