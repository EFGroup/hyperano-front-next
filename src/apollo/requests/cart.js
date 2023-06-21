import { gql } from '@apollo/client';

export default {
  orderCart: gql`
    query orderCart {
      orderCart {
        id
        shop {
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
        items {
          id
          previous_me_price
          me_price
          previous_number
          number
          messages
          user_agent
          co_price
          product_shop {
            id
            wolesale_discounts {
              quantity
              discount_amount
              discount_percent
            }
            product_info {
              id
              title
              barcode
              images
            }
          }
          attribute_values {
            id
            title
            price_change_value
            attribute {
              id
              title
            }
          }
          total_price
          discount_amount
          attribute_amount
        }
        min_order_cost
        free_shipp_remaininig
        min_order_cost_remaininig
        total_price_cart
        product_counts_cart
        product_numbers_cart
        discount_amount_cart
        messages
      }
    }
  `,
  userOrderCart: gql`
    query orderCart {
      orderCart {
        id
        user {
          id
        }
        shop {
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
        category_coupon {
          id
        }
        discount_code
        items {
          id
          previous_me_price
          me_price
          previous_number
          number
          messages
          user_agent
          co_price
          product_shop {
            id
            product_info {
              id
              title
              barcode
              images
            }
          }
          attribute_values {
            id
            title
            price_change_value
            attribute {
              id
              title
            }
          }
          attribute_amount
          total_price
          discount_amount
        }
        min_order_cost_remaininig
        min_order_cost
        free_shipp_remaininig
        total_price_cart
        discount_amount_cart
        product_counts_cart
        product_numbers_cart
        messages
        coupon_infos {
          coupons {
            message
            category {
              id
              title
              total_amount
            }
            id
            title
            amount
            used_to_now
            coupon_user {
              used_amount
            }
          }
          total_used_coupon_to_now
        }
        discount_infos {
          discount {
            id
            expire_at
            expire_at_shamsi
            code
            value
            discount_type {
              id
              title
            }
          }
          message
          order_discount
        }
      }
    }
  `,
  saveOrderCartItem: gql`
    mutation saveOrderCartItem(
      $type: String!
      $product_shop_id: String!
      $order_cart_id: String
      $order_cart_item_id: String
      $attribute_value_ids: [String]
      $number: Int
      $category_coupon_id: String
      $discount_code: String
    ) {
      saveOrderCartItem(
        type: $type
        product_shop_id: $product_shop_id
        order_cart_id: $order_cart_id
        order_cart_item_id: $order_cart_item_id
        attribute_value_ids: $attribute_value_ids
        number: $number
        category_coupon_id: $category_coupon_id
        discount_code: $discount_code
      ) {
        cart {
          id
          user {
            id
          }
          shop {
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
          category_coupon {
            id
          }
          discount_code
          items {
            id
            previous_me_price
            me_price
            previous_number
            number
            messages
            user_agent
            co_price
            product_shop {
              id
              product_info {
                id
                title
                barcode
                images
              }
            }
            attribute_values {
              id
              title
              price_change_value
              attribute {
                id
                title
              }
            }
            attribute_amount
            total_price
            discount_amount
          }
        }
        min_order_cost_remaininig
        min_order_cost
        free_shipp_remaininig
        total_price_cart
        discount_amount_cart
        product_counts_cart
        product_numbers_cart
        messages
        coupon_infos {
          coupons {
            message
            category {
              id
              title
              total_amount
            }
            id
            title
            amount
            used_to_now
            coupon_user {
              used_amount
            }
          }
          total_used_coupon_to_now
        }
        discount_infos {
          discount {
            id
            expire_at
            expire_at_shamsi
            code
            value
            discount_type {
              id
              title
            }
          }
          message
          order_discount
        }
      }
    }
  `,
  deleteOrderCart: gql`
    mutation deleteOrderCart($ids: [String]!) {
      deleteOrderCart(ids: $ids) {
        messages
        influenced_count
      }
    }
  `,
};
