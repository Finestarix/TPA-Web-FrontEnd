import gql from 'graphql-tag';

export const getAllFlight = gql`
    {
        AllFlight {
            arrivalTime
            company {
                id
                image
                name
            }
            companyID
            departureTime
            facility {
                flightID
                image
                id
                name
            }
            fromAirport {
                code
                id
                location {
                    city
                    id
                    province
                    region
                }
                locationID
                name
            }
            fromAirportID
            id
            model
            price
            transit {
                code
                id
                location {
                    city
                    id
                    province
                    region
                }
                locationID
                name
            }
            toAirport {
                code
                id
                location {
                    city
                    id
                    province
                    region
                }
                locationID
                name
            }
            toAirportID
        }
    }
`;

export const insertFlight = gql`
    mutation insertFlight($companyData: String!, $modelData: String!,
        $priceData: Int!, $fromAirportData: String!, $toAirportData: String!,
        $transitAirportData: String!, $arrivalData: String!, $departureData: String!) {
        InsertNewFlight(company: $companyData, model: $modelData,
            price: $priceData, fromAirport: $fromAirportData,
            toAirport: $toAirportData,
            transitAirport: $transitAirportData,
            arrivalTime: $arrivalData, departureTime: $departureData) {
            id
        }
    }
`;

export const updateFlight = gql`
    mutation updateFlight($idData: Int!, $modelData: String!,
        $priceData: Int!, $fromAirportData: String!, $toAirportData: String!,
        $transitAirportData: String!, $arrivalData: String!, $departureData: String!) {
        UpdateFlight(id: $idData, model: $modelData,
            price: $priceData, fromAirport: $fromAirportData,
            toAirport: $toAirportData,
            transitAirport: $transitAirportData,
            arrivalTime: $arrivalData, departureTime: $departureData) {
            id
        }
    }
`;

export const deleteFlight = gql`
    mutation deleteFlight($idData: Int!) {
        DeleteFlight(id: $idData) {
            id
        }
    }
`;
