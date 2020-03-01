import gql from 'graphql-tag';

export const getAllEvent = gql `
    query {
        AllEntertainment {
            category
            date
            id
            latitude
            location
            longitude
            image
            price
            title
        }
    }
`;

export const insertEvent = gql`
    mutation insertEvent($categoryData:String!, $imageData:String!,
        $titleData:String!, $priceData:Int!, $locationData: String!, $latitudeData: Float!,
        $longitudeData: Float!, $dateData: String!) {
        InsertNewEvent(category: $categoryData, image: $imageData, title: $titleData,
            price: $priceData, location: $locationData, latitude: $latitudeData,
            longitude: $longitudeData, date: $dateData) {
            id
        }
    }
`;

export const updateEvent = gql`
    mutation updateEvent($idData:String!, $categoryData:String!, $imageData:String!,
        $titleData:String!, $priceData:Int!, $locationData: String!, $latitudeData: Float!,
        $longitudeData: Float!, $dateData: String!) {
        UpdateEvent(id: $idData, category: $categoryData, image: $imageData, title: $titleData,
            price: $priceData, location: $locationData, latitude: $latitudeData,
            longitude: $longitudeData, date: $dateData) {
            id
        }
    }
`;

export const deleteEvent = gql `
    mutation deleteEvent($idData: Int!) {
        DeleteEvent(id: $idData) {
            id
        }
    }
`;
