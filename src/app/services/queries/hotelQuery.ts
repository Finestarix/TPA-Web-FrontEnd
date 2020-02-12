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

export const getHotelByProvince = gql `
    query hotelByLocation($provinceData: String!) {
        GetHotelByLocation(province: $provinceData) {
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

