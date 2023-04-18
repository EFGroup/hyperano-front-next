import { gql } from '@apollo/client';

export default {
  checkCoupon: gql`
    mutation checkCoupon(
      $order_id: String!
      $category_coupon_id: String
    ) {
      checkCoupon (
        order_id: $order_id
        category_coupon_id: $category_coupon_id
      ) {
        model {
          coupon_user {
            id
            used_amount
            coupon {
              title
              type
              amount
              start_date_shamsi
              end_date_shamsi
              products_shop {
                product_info {
                  title
                }
              }
              category {
                id
                title
              }
            }
          }
          order_discount
          messages
        }
        total_coupon
      }
    }
  `,
  list: gql`
    query categoryCouponList(
      $ids: [String]
      $usable: Int
      $codes: [String]
      $shop_ids: [String]
      $title: String
      $is_active: Int
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      categoryCoupon(
        ids: $ids
        shop_ids: $shop_ids
        usable: $usable
        codes: $codes
        title: $title
        is_active: $is_active
        page: $page
        limit: $limit
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
      ) {
        data {
          id
          title
          description
          total_amount
          start_date
          end_date
          is_active
          orders {
            id
            tracking_code
          }
          coupons {
            id
            type
            title
            amount
            is_active
            assignment_type
            shop {
              id
              title
            }
            orders {
              order {
                tracking_code
              }
              amount
            }
            coupon_user {
              used_amount
              usable
              remain_amount
              viewed_on
            }
            products_shop {
              id
              product_info {
                id
                title
                images
              }
            }
            product_categories {
              id
              title
            }
          }
        }
      }
    }
  `,
  get: gql`
    query get($ids: String!) {
      categoryCoupon(ids: $ids) {
        data {
          id
          code
          details
          title
          is_active
          total_amount
          description
          start_date
          start_date_shamsi
          end_date
          end_date_shamsi
          orders {
            id
            tracking_code
          }
          coupons {
            priority
            code
            details
            id
            title
            type
            is_active
            amount
            description
            start_date
            start_date_shamsi
            end_date
            end_date_shamsi
            assignment_type
            orders {
              order {
                tracking_code
              }
              amount
            }
            products_shop {
              id
              product_info {
                id
                title
              }
            }
            coupon_user {
              used_amount
              usable
              remain_amount
              viewed_on
            }
            shop {
              id
              title
            }
            product_categories {
              id
              title
            }
          }
        }
      }
    }
  `
};
