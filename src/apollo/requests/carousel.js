import { gql } from '@apollo/client';

export default {
  get: gql`
    query carousel(
      $category_ids: [String]
      $shop_id: String
      $box_nums: Int
      $minimum_percentage_discount: Int
      $depth: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
      $category_orderBy_field: String
      $category_orderBy_direction: String
    ) {
      carousel(
        category_ids: $category_ids
        shop_id: $shop_id
        box_nums: $box_nums
        minimum_percentage_discount: $minimum_percentage_discount
        depth: $depth
        limit: $limit
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
        category_orderBy_field: $category_orderBy_field
        category_orderBy_direction: $category_orderBy_direction
      ) {
        root_category {
          product_categories_shops {
            link_to
            banners
          }
          id
          title
          link_to
          banners
        }
        selected_categories {
          id
          title
          images
          link_to
        }
        products {
          id
          co_price
          me_price
          discount_percent
          max_number_buy
          start_time
          start_time_shamsi
          end_time
          end_time_shamsi
          has_timer
          discount_type {
            id
            title
          }
          product_info {
            id
            title
            introtext
            images
            category {
              title
            }
            brand {
              id
              title
            }
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
          attributes {
            id
            title
            type
            values {
              id
              title
              price_change_value
            }
          }
        }
      }
    }
  `
};
