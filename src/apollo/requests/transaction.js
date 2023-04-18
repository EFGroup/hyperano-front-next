import { gql } from '@apollo/client';

export default {
  list: gql`
    query list(
      $ids: [String]
      $type: String
      $status: String
      $order_ids: [String]
      $ref_code: String
      $created_at: String
      $min_created_at: String
      $min_created_at_equality: String
      $max_created_at: String
      $max_created_at_equality: String
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      transaction(
        ids: $ids
        type: $type
        status: $status
        order_ids: $order_ids
        ref_code: $ref_code
        created_at: $created_at
        min_created_at: $min_created_at
        min_created_at_equality: $min_created_at_equality
        max_created_at: $max_created_at
        max_created_at_equality: $max_created_at_equality
        page: $page
        limit: $limit
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
      ) {
        total
        per_page
        current_page
        from
        to
        last_page
        has_more_pages
        data {
          id
          price
          type
          status
          ref_code
          description
          created_at
          created_at_shamsi
        }
      }
    }
  `,
  get: gql`
    query get($ids: String!) {
      transaction(ids: $ids) {
        data {
          id
          price
          type
          status
          detail {
            id
            terminal {
              title
            }
          }
          wallet {
            id
          }
          order {
            id
          }
          order_detail {
            id
          }
          ref_code
          description
          created_at
          created_at_shamsi
        }
      }
    }
  `
};
