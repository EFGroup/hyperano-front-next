import { gql } from '@apollo/client';

export default {
  list: gql`
    query list(
      $ids: [String]
      $type_ids: [String]
      $address_id: String
      $is_active: Int
      $order_id: String!
      $shop_ids: [String]!
    ) {
      shipping(
        ids: $ids
        type_ids: $type_ids
        address_id: $address_id
        is_active: $is_active
        order_id: $order_id
        shop_ids: $shop_ids
      ) {
        id
        cost
        details
        shipping_type {
          id
          title
        }
        shipping_hours
      }
    }
  `
};
