import { gql } from '@apollo/client';

export default {
  list: gql`
    query couponUser(
      $coupon_ids: [String]
      $shop_id: String
      $viewed_on: String
      $usable: Int
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      couponUser(
        coupon_ids: $coupon_ids
        shop_id: $shop_id
        viewed_on: $viewed_on
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
          used_amount
          remain_amount
          viewed_on
          usable
          coupon {
            id
            code
            is_active
            title
            description
            amount
            type
            start_date
            start_date_shamsi
            end_date
            end_date_shamsi
            used_to_now
            category {
              id
              code
              is_active
              title
            }
            shop {
              id
              title
            }
          }
        }
      }
    }
  `,
  get: gql`
    query get($coupon_ids: String!) {
      couponUser(coupon_ids: $coupon_ids) {
        data {
          id
          used_amount
          remain_amount
          viewed_on
          usable
          coupon {
            id
            title
            description
            amount
            type
            start_date
            start_date_shamsi
            end_date
            end_date_shamsi
            category {
              id
              title
            }
          }
        }
      }
    }
  `,
  check: gql`
    mutation check($category_coupon_id: String, $coupon_ids: [String], $order_id: String!) {
      checkCoupon(
        category_coupon_id: $category_coupon_id
        coupon_ids: $coupon_ids
        order_id: $order_id
      ) {
        model {
          coupon_user {
            id
            used_amount
            coupon {
              title
              type
              amount
              start_date
              start_date_shamsi
              end_date
              end_date_shamsi
              products_shop {
                product_info {
                  title
                }
              }
            }
          }
          order_discount
          messages
        }
        total_coupon
      }
    }
  `
};
