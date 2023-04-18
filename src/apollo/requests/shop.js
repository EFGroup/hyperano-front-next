import { gql } from '@apollo/client';

export default {
  list: gql`
    query shop(
      $ids: [String]
      $title: String
      $type_ids: [String]
      $lat: String
      $lng: String
      $distance: String
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      shop(
        ids: $ids
        title: $title
        type_ids: $type_ids
        lat: $lat
        lng: $lng
        distance: $distance
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
          title
          min_order_cost
          min_free_ship
          lat
          lng
          status {
            id
            title
          }
          type {
            id
            title
          }
          is_active
          support_info
          products_count
          avg_scores_shop
        }
      }
    }
  `,
  get: gql`
    query get($ids: String!) {
      shop(ids: $ids) {
        data {
          id
          title
          min_order_cost
          min_free_ship
          lat
          lng
          status {
            id
            title
          }
          type {
            id
            title
          }
          is_active
          support_info
          regions {
            id
            title
          }
          products_count
          avg_scores_shop
        }
      }
    }
  `
};
