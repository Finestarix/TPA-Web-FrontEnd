import gql from 'graphql-tag';

export const getCarByLocation = gql`
    query getCarByCity($cityData: String!){
        GetCarByCity(city: $cityData) {
            carModel {
                id
                baggage
                image
                brand
                model
                passenger
            }
            price
            id
            location {
                city
                id
                province
                region
            }
        }
    }
`;

export const getAllCarModel = gql `
    {
        AllCarModel {
            baggage
            id
            image
            model
            passenger
            brand
        }
    }
`;
