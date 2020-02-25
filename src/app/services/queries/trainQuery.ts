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
            class {
                id
                name
                trainId
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
            code
            price
            seat
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
