import gql from 'graphql-tag';

export const getEmailAndPhone = gql`
  query getCurrentUser($param: String!) {
    UserByEmailAndPhone(emailphone: $param) {
      id
      firstname
      lastname
      email
      phone
    }
  }
`;

export const getValidUser = gql`
  query getUserLogin($searchEmailPhone: String!, $searchPassword: String!) {
    UserLogin(emailphone: $searchEmailPhone, password: $searchPassword) {
      id
      firstname
      lastname
      email
      password
      phonecodeid
      phone
    }
  }
`;

