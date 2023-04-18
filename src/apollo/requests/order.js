import { gql } from '@apollo/client';

export default {
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
          items {
            id
            product_shop {
              max_number_buy
              co_price
              me_price
              discount_percent
              product_info {
                title
                brand {
                  title
                }
                introtext
                images
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
            }
            co_price
            me_price
            number
            total_price
            discount_amount
            attribute_amount
            attribute_values {
              id
              title
              price_change_value
            }
          }
        }
        min_order_cost_remaininig
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
  saveOrderProduct: gql`
    mutation saveOrderProduct($order_cart_id: String!, $call_me: Int, $description: String) {
      saveOrderProduct(
        order_cart_id: $order_cart_id
        call_me: $call_me
        description: $description
      ) {
        order {
          customer {
            firstname
            lastname
            cellphone
          }
          shop {
            id
            title
          }
          co_products_cost
          me_products_cost
          products_discount
          created_at
          created_at_shamsi
          order_details {
            id
            co_price
            me_price
            attribute_amount
            number
            total_price
            discount_title
            discount_amount
            discount_percent
            discount_percent
            product_shop {
              id
              product_info {
                id
                title
                images
                brand {
                  title
                }
                introtext
              }
            }
            attribute_values {
              id
              title
              price_change_value
              attribute {
                title
                id
              }
            }
          }
          status {
            id
            title
          }
          call_me
          id
          tracking_code
        }
        messages
      }
    }
  `,
  saveInfo: gql`
    mutation saveOrderInfo(
      $order_id: String!
      $address_id: String!
      $shipping_id: String!
      $payment_type_id: String!
      $demand_date: String
      $demand_hour: String
      $description: String
      $call_me: Int
    ) {
      saveOrderInfo(
        order_id: $order_id
        address_id: $address_id
        shipping_id: $shipping_id
        payment_type_id: $payment_type_id
        demand_date: $demand_date
        demand_hour: $demand_hour
        description: $description
        call_me: $call_me
      ) {
        messages
        model {
          customer {
            firstname
            lastname
            cellphone
          }
          shop {
            id
            title
          }
          shipping_cost
          base_shipping_cost
          total_cost
          demand_time
          demand_time_shamsi
          description
          sys_description
          fast_send
          products_discount
          shipping {
            shipping_type {
              title
            }
          }
          payment_status {
            title
          }
          shipping_code
          created_at
          created_at_shamsi
          status {
            id
            title
          }
          call_me
          id
          tracking_code
        }
      }
    }
  `,
  confirm: gql`
    mutation confirmOrder(
      $order_id: String!
      $discount_code: String
      $category_coupon_id: String
      $technical_informations: String
      $call_me: Int
      $description: String
    ) {
      confirmOrder(
        order_id: $order_id
        discount_code: $discount_code
        category_coupon_id: $category_coupon_id
        technical_informations: $technical_informations
        call_me: $call_me
        description: $description
      ) {
        model {
          id
          tracking_code
          status {
            id
            title
          }
          discount {
            discount_type {
              title
            }
          }
          payment_status {
            id
            title
          }
          payment_type {
            id
            title
          }
          discount_title
          discount_messages
          total_discount
          order_discount
          products_discount
          wallet_settled_amount
        }
        online_payment_refId
        messages
      }
    }
  `,
  list: gql`
    query listOrder(
      $ids: [String]
      $shop_ids: [String]
      $address_ids: [String]
      $tracking_codes: [String]
      $discount_ids: [String]
      $shipping_ids: [String]
      $payment_type_ids: [String]
      $payment_status_ids: [String]
      $status_ids: [String]
      $created_at: String
      $demand_time: String
      $delivery_time: String
      $fast_send: Int
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      order(
        ids: $ids
        shop_ids: $shop_ids
        address_ids: $address_ids
        tracking_codes: $tracking_codes
        discount_ids: $discount_ids
        shipping_ids: $shipping_ids
        payment_type_ids: $payment_type_ids
        payment_status_ids: $payment_status_ids
        status_ids: $status_ids
        created_at: $created_at
        demand_time: $demand_time
        delivery_time: $delivery_time
        fast_send: $fast_send
        page: $page
        limit: $limit
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
      ) {
        to
        from
        total
        per_page
        last_page
        current_page
        has_more_pages
        data {
          id
          created_at
          tracking_code
          total_cost
          co_products_cost
          me_products_cost
          products_discount
          
          shipping_cost
          base_shipping_cost
          total_discount
          discount_title
          order_discount

          status {
            id
            title
          }
          coupons {
            amount
            coupon {
              amount
              used_to_now
              title
            }
          }
          payment_type {
            id
            title
          }
          payment_status {
            id
            title
          }
          shop {
            id
            title
          }
        }
      }
    }
  `,
  get: gql`
    query getOrder($ids: [String], $tracking_codes: [String]) {
      order(ids: $ids, tracking_codes: $tracking_codes) {
        data {
          customer {
            firstname
            lastname
            cellphone
          }
          id
          tracking_code
          co_products_cost
          me_products_cost
          products_discount
          created_at
          created_at_shamsi
          shipping_cost
          base_shipping_cost
          total_discount
          order_discount
          wallet_settled_amount
          coupons {
            amount
            coupon {
              amount
              used_to_now
              title
            }
          }
          category_coupon {
            title
          }
          transactions {
            created_at
            created_at_shamsi
            type
            price
            status
            description
            ref_code
            detail {
              ref_id
              pan
              terminal {
                title
              }
            }
          }
          total_cost
          paid_cost
          demand_time
          demand_time_shamsi
          delivery_time
          delivery_time_shamsi
          discount {
            id
            value
            discount_type {
              title
            }
          }
          discount_title
          description
          sys_description
          fast_send
          address {
            title
            main_street
            minor_address
            pfu
            postal_code
            lat
            lng
            tellphone
            is_default
          }
          shipping {
            shipping_type {
              title
            }
          }
          payment_type {
            id
            title
          }
          status {
            id
            title
          }
          carrier {
            id
            user {
              id
              firstname
              lastname
              cellphone
            }
          }
          payment_status {
            id
            title
          }
          personally_code
          shipping_code
          call_me
          shop {
            id
            title
            support_info
          }
          order_details {
            id
            status
            co_price
            me_price
            number
            total_price
            discount_title
            discount_amount
            product_shop {
              id
              product_info {
                id
                title
                introtext
                brand {
                  title
                }
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
          }
          scores {
            id
            score {
              title
            }
            value
            description
            created_at
            created_at_shamsi
          }
        }
      }
    }
  `,
  update: gql`
    mutation updateOrder(
      $ids: [String]!
      $status_id: String
      $payment_type_id: String
      $call_me: Int
    ) {
      updateOrder(
        ids: $ids
        status_id: $status_id
        payment_type_id: $payment_type_id
        call_me: $call_me
      ) {
        model {
          id
          tracking_code
          customer {
            id
            firstname
            lastname
            cellphone
          }
          total_cost
          created_at
          created_at_shamsi
          demand_time
          demand_time_shamsi
          status {
            id
            title
          }
          order_details {
            id
            status
            co_price
            me_price
            number
            total_price
            discount_title
            discount_amount
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
          }
          payment_type {
            id
            title
          }
          payment_status {
            id
            title
          }
          shop {
            id
            title
            support_info
          }
          call_me
        }
        influenced_count
        messages
      }
    }
  `
};