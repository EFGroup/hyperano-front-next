import { gql } from '@apollo/client';

export default {
  get: gql`
    query get($ids: String) {
      wallet(ids: $ids) {
        data {
          id
          balance
        }
      }
    }
  `
};
