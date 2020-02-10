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

export const getHotelByCity = gql `
    query hotelByLocation($cityData: String!){
        GetHotelByLocation(city: $cityData) {
            id
            photo {
                hotelid
                source
            }
            facility {
                name
                photo
            }
            name
            address
            rating
            price
            location {
                city
                province
                region
            }
        }
    }
`;

