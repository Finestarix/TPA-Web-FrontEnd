import gql from 'graphql-tag';

export const getLocation = gql`
    query getLocation {
        AllLocation {
            city
        }
    }
`;

