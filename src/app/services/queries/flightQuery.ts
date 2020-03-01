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

export const getAllFlightAirport = gql`
    {
        AllFlightAirport {
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
    }
`;

export const getAllFlightData = gql`
    query getFlight($dateData: String!, $fromData: String!, $toData: String!) {
        FlightByLocation(date: $dateData, fromAirport: $fromData, toAirport: $toData) {
            arrivalTime
            company {
                name
                image
            }
            departureTime
            facility {
                image
                name
            }
            fromAirport {
                code
                name
            }
            id
            model
            price
            toAirport {
                code
                name
            }
            transit {
                code
                name
            }
            transitDuration
        }
    }

`;

export const insertFlight = gql`
    mutation insertFlight($companyData: String!, $modelData: String!, $durationData: Int!,
        $priceData: Int!, $fromAirportData: String!, $toAirportData: String!,
        $transitAirportData: String!, $arrivalData: String!, $departureData: String!) {
        InsertNewFlight(company: $companyData, model: $modelData,
            price: $priceData, fromAirport: $fromAirportData,
            toAirport: $toAirportData, duration: $durationData,
            transitAirport: $transitAirportData,
            arrivalTime: $arrivalData, departureTime: $departureData) {
            id
        }
    }
`;

export const updateFlight = gql`
    mutation updateFlight($idData: Int!, $modelData: String!, $durationData: Int!,
        $priceData: Int!, $fromAirportData: String!, $toAirportData: String!,
        $transitAirportData: String!, $arrivalData: String!, $departureData: String!) {
        UpdateFlight(id: $idData, model: $modelData,
            price: $priceData, fromAirport: $fromAirportData,
            toAirport: $toAirportData, duration: $durationData,
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
