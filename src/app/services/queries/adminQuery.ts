import gql from 'graphql-tag';

export const getAdminLogin = gql`
    query adminLogin($emailData: String!, $passwordData: String!) {
        AdminLogin(email: $emailData, password: $passwordData) {
            jwtToken
        }
    }
`;


