import gql from 'graphql-tag';

export const getPhoneCode = gql`
    query getPhoneCode {
        AllPhoneCode {
            country
            code
        }
    }
`;


