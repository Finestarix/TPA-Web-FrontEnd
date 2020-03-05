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

export const getHotelByProvince = gql`
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

export const getHotelByLatLong = gql`
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

export const getHotelByID = gql`
    query getHotelByID($idData: String!) {
        GetHotelByID(id: $idData) {
            information
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
            type {
                name
            }
        }
    }
`;

export const getAllHotel = gql`
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
            information
            type {
                name
            }
        }
    }
`;

export const deleteHotelByID = gql`
    mutation hotelData($idData: String!) {
        DeleteHotel(id: $idData) {
            id
        }
    }
`;

export const insertHotel = gql`
    mutation insertHotel($nameData: String!, $ratingData: String!, $addressData: String!,
        $locationData: String!, $priceData: Int!, $latitudeData: String!,
        $longitudeData: String!, $informationData: String!) {
        InsertNewHotel(name: $nameData, rating: $ratingData, address: $addressData,
            location: $locationData, price: $priceData, latitude: $latitudeData,
            longitude: $longitudeData, information: $informationData) {
            id
        }
    }
`;

export const updateHotel = gql`
    mutation updateHotel($idData: String!, $nameData:String!, $priceData: Int!, $ratingData: String!, $informationData: String!) {
        UpdateHotel(id: $idData, name: $nameData, price: $priceData, rating: $ratingData, information: $informationData) {
            id
        }
    }
`;

export const insertHotelFacility = gql`
    mutation insertHotelFacility($idData: Int!, $nameData: String!) {
        InsertHotelFacility(hotelid: $idData, name: $nameData) {
            id
        }
    }
`;

export const insertHotelType = gql`
    mutation insertHotelType($idData: Int!, $nameData: String!) {
        InsertHotelType(hotelid: $idData, name: $nameData) {
            id
        }
    }
`;

export const getHotelByRadius = gql`
    query getHotelByRadius($latitude: Float!, $longitude: Float!) {
        GetHotelByRadius(latitude: $latitude, longitude: $longitude) {
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
