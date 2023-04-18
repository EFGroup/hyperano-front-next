import { gql } from '@apollo/client';

export default {
  list: gql`
    query list(
      $discount_ids: [String]
      $type_ids: [String]
      $shop_ids: [String]
      $number: Int
      $is_active: Int
      $usable: Int
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      discountUser(
        discount_ids: $discount_ids
        type_ids: $type_ids
        shop_ids: $shop_ids
        number: $number
        is_active: $is_active
        usable: $usable
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
          number
          is_active
          usable
          discounts {
            id
            value
            code
            expire_at
            expire_at_shamsi
            is_active
            shop {
              id
              title
            }
            discount_type {
              id
              title
            }
          }
        }
      }
    }
  `,
  get: gql`
    query get($discount_ids: String!) {
      discountUser(discount_ids: $discount_ids) {
        data {
          total
          per_page
          current_page
          from
          to
          last_page
          has_more_pages
          data {
            id
            number
            is_active
            details
            usable
            presenter {
              firstname
              lastname
            }
            discount {
              id
              is_active
              details
              shop {
                id
                title
              }
              orders {
                id
                tracking_code
              }
              code
              expire_at
              expire_at_shamsi
              value
              discount_type {
                id
                title
              }
            }
          }
        }
      }
    }
  `,
  check: gql`
    mutation check($discount_code: String!, $order_id: String!) {
      checkDiscount(discount_code: $discount_code, order_id: $order_id) {
        discount_user {
          id
          discount {
            value
            expire_at
            shop {
              title
            }
            discount_type {
              title
            }
          }
        }
        order_discount
        messages
      }
    }
  `
};
