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
            latitude
            longitude
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

export const getHotelByLatLong = gql `
    query getHotelByLatLong($latitude: Float!, $longitude: Float!) {
        GetHotelByLatLong(latitude: $latitude, longitude: $longitude) {
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
            latitude
            longitude
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

export const getHotelByID = gql `
    query getHotelByID($idData: Int!) {
        GetHotelByID(id: $idData) {
            id
            name
            location {
                city
                province
                region
            }
            facility {
                name
                photo
            }
            photo {
                source
                id
                hotelid
            }
            latitude
            longitude
        }
    }
`;

export const getAllHotel = gql `
    query {
        AllHotel {
            address
            facility {
                hotelid
                id
                name
                photo
            }
            id
            latitude
            location {
                city
                id
                province
                region
            }
            locationid
            longitude
            name
            photo {
                hotelid
                id
                source
            }
            price
            rating
        }
    }
`;

export const deleteHotelByID = gql `
    mutation hotelData($idData: String!) {
        DeleteHotel(id: $idData) {
            id
        }
    }
`;
