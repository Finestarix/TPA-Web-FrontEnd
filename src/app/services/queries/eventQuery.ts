import gql from 'graphql-tag';

export const getAllEvent = gql`
    query {
        AllEntertainment {
            type
            date
            id
            latitude
            location
            longitude
            image
            price
            title
            description
            termCondition
        }
    }
`;

export const insertEvent = gql`
    mutation insertEvent($categoryData:String!, $imageData:String!,
        $titleData:String!, $priceData:Int!, $locationData: String!, $latitudeData: Float!,
        $longitudeData: Float!, $dateData: String!, $descriptionData: String!, $termConditionData: String!) {
        InsertNewEvent(category: $categoryData, image: $imageData, title: $titleData,
            price: $priceData, location: $locationData, latitude: $latitudeData,
            longitude: $longitudeData, date: $dateData, description: $descriptionData,
            termCondition: $termConditionData) {
            id
        }
    }
`;

export const updateEvent = gql`
    mutation updateEvent($idData:Int!, $categoryData:String!, $imageData:String!,
        $titleData:String!, $priceData:Int!, $locationData: String!, $latitudeData: Float!,
        $longitudeData: Float!, $dateData: String!, $descriptionData: String!, $termConditionData: String!) {
        UpdateEvent(id: $idData, category: $categoryData, image: $imageData, title: $titleData,
            price: $priceData, location: $locationData, latitude: $latitudeData,
            longitude: $longitudeData, date: $dateData, description: $descriptionData,
            termCondition: $termConditionData) {
            id
        }
    }
`;

export const deleteEvent = gql`
    mutation deleteEvent($idData: Int!) {
        DeleteEvent(id: $idData) {
            id
        }
    }
`;

export const getEntertainment = gql`
  query getEntCategory($categoryData: String!){
      GetEntertainmentCategory(category: $categoryData) {
          type
          date
          id
          latitude
          location
          longitude
          image
          price
          title
          description
          termCondition
      }
  }
`;

export const getFilterEntertainment = gql`
  query getFilter($lowPriceData: Int!, $highPriceData: Int!,
      $startDateData: String!, $endDateData: String!, $isActivityData: String!,
      $isEventData: String!, $isAttractionData: String!, $locationData: String!){
      GetFilterEntertainment(lowPrice: $lowPriceData, highPrice: $highPriceData,
          startDate: $startDateData, endDate: $endDateData, isActivity: $isActivityData,
          isEvent: $isEventData, isAttraction: $isAttractionData, location: $locationData ) {
              type
              date
              id
              latitude
              location
              longitude
              image
              price
              title
              description
              termCondition
      }
  }
`;
