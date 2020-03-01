import gql from 'graphql-tag';

export const getAllTrain = gql`
    query getAllTrain {
        AllTrain {
            arrivalTime
            departureTime
            id
            arrival {
                code
                id
                locationId
                name
            }
            class
            transit {
                code
                id
                locationId
                name
            }
            departure {
                code
                id
                locationId
                name
            }
            name
            code
            price
            seat
        }
    }
`;

export const getAllTrainStation = gql`
    query getAllTrainStation {
        AllTrainStation {
            code
            id
            location {
                city
                id
                province
                region
            }
            locationId
            name
        }
    }
`;

export const deleteTrainByID = gql`
    mutation deleteTrainData($idData: String!) {
        DeleteTrain(id: $idData) {
            id
            arrival{
                code
                id
                locationId
                name
            }
            transit {
                code
                id
                locationId
                name
            }
            departure {
                code
                id
                locationId
                name
            }
            name
            price
            seat

        }
    }
`;

export const insertTrain = gql`
    mutation($nameData: String!, $codeData: String!, $classData: String!, $seatData: Int!, $priceData: Int!, $arrivalData: String!,
        $arrivalTimeData: String!, $transitData: String!, $departureData: String!, $departureTimeData: String!) {
        InsertNewTrain(name: $nameData, code: $codeData, class: $classData, seat: $seatData, price: $priceData, arrival: $arrivalData,
            arrivalTime: $arrivalTimeData, transit: $transitData, departure: $departureData, departureTime: $departureTimeData) {
            id
        }
    }
`;

export const updateTrain = gql`
    mutation($idData: String!, $seatData: Int!, $priceData: Int!,
        $arrivalTimeData: String!, $departureTimeData: String!) {
        UpdateTrain(id: $idData, seat: $seatData, price: $priceData,
            arrivalTime: $arrivalTimeData, departureTime: $departureTimeData) {
            id
        }
    }
`;

export const getAllStation = gql`
    {
        AllTrainStation {
            code
            id
            location {
                city
                province
                region
            }
            name
        }
    }
`;

export const getTrainByLocation = gql`
    query getTrain($arrivalData: String!, $departureData:String!, $dateData: String!){
        GetTrainByLocation(arrival: $arrivalData, departure:$departureData, date:$dateData) {
            id
            arrival{
                code
                id
                locationId
                name
            }
            transit {
                code
                id
                locationId
                name
            }
            departure {
                code
                id
                locationId
                name
            }
            arrivalTime
            departureTime
            name
            price
            seat
            code
            class
        }
    }
`;
