import gql from "graphql-tag";

export const getPromo = gql`
  query getPromo($idData: Int!){
    GetPromo(id: $idData) {
      detail
      id
      image
      name
    }
  }
`;

export const getOther = gql`
    query getOther($idData: Int!){
        OtherPromo(id: $idData) {
            detail
            id
            image
            name
        }
    }
`;
