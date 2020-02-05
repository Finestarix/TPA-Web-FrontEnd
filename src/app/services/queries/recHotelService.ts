import gql from 'graphql-tag';

export const getRecommendedHotel = gql`
    query nearestHotel($latitude: Float!, $longitude: Float!){
        NearestHotel(latitude: $latitude, longitude: $longitude) {
            name,
            price,
            rating,
            photo {
                source
            }
        }
    }
`;

