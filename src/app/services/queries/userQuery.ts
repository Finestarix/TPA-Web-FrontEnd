import gql from 'graphql-tag';

export const getEmailAndPhone = gql`
    query getCurrentUser($param: String!) {
        UserByEmailAndPhone(emailphone: $param) {
            id
            firstname
            lastname
            email
            phone
        }
    }
`;

export const getValidUser = gql`
    query getUserLogin($searchEmailPhone: String!, $searchPassword: String!) {
        UserLogin(emailphone: $searchEmailPhone, password: $searchPassword) {
            jwtToken
        }
    }
`;

export const insertNewUser = gql`
    mutation insertNewUser($firstNameData: String!, $lastNameData: String!, $emailData: String!,
        $phoneCodeData: String!, $phoneData: String!, $passwordData: String!, $imageData: String!) {
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

export const getUserByID = gql`
    query getUserLogin($searchID: String!) {
        UserByID(id: $searchID) {
            id
            firstname
            lastname
            image
        }
    }
`;

export const updateUser = gql`
    mutation updateUser($titleData: String!, $firstNameData: String!,
        $lastNameData: String!, $cityData: String!, $addressData: String!,
        $zipCodeData: String!, $idData: Int!){
            UpdateUserProfile(title: $titleData, firstname: $firstNameData,
                  lastname: $lastNameData, city: $cityData, address: $addressData,
                  zipcode: $zipCodeData, id: $idData) {
            id
        }
    }
`;


