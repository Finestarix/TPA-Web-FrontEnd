import gql from 'graphql-tag';

export const getLocation = gql`
    query getLocation {
        AllLocation {
            province
        }
    }
`;

export const getLocationProvince = gql`
    query getCityByProvince($provinceData: String!) {
        GetCityByProvince(province: $provinceData) {
            id
            city
            province
            region
        }
    }
`;

