import { gql } from '@apollo/client';

export default {
  list: gql`
    query list(
      $ids: [String]
      $producer_ids: [String]
      $title: String
      $category_id: String
      $shop_id: String
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      brand(
        ids: $ids
        producer_ids: $producer_ids
        title: $title
        category_id: $category_id
        shop_id: $shop_id
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
          # code
          # details
          # producer
          # products
        }
      }
    }
  `
};
