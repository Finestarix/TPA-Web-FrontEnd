import gql from 'graphql-tag';

export const insertSubscription = gql`
    mutation insertSubscription($emailData: String!) {
        InsertNewSubscription(email: $emailData) {
            email
            id
        }
    }
`;
