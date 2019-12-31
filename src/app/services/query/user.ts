import gql from 'graphql-tag';

export const getEmailAndPhone = gql`
  query getCurrentUser($emailphone: String!) {
    UserByEmailAndPhone(emailphone: $emailphone) {
      id
      firstname
      lastname
      email
      phone
    }
  }
 `;

