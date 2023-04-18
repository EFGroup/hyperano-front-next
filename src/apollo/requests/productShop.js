import { gql } from '@apollo/client';

export default {
  list: gql`
    query list(
      $shop_ids: [String]
      $title: String
      $ids: [String]
      $category_ids: [String]
      $product_ids: [String]
      $discount_type_ids: [String]
      $brand_ids: [String]
      $brand_titles: [String]
      $barcodes: [String]
      $min_me_price: String
      $min_me_price_equality: String
      $max_me_price: String
      $max_me_price_equality: String
      $is_exist: Int
      $is_active: Int
      $from_sub_childs: Int
      $coupon_id: String
      $from_all_shops: Int
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
      $withs: [String]
    ) {
      productShop(
        shop_ids: $shop_ids
        title: $title
        ids: $ids
        category_ids: $category_ids
        product_ids: $product_ids
        discount_type_ids: $discount_type_ids
        brand_ids: $brand_ids
        brand_titles: $brand_titles
        barcodes: $barcodes
        min_me_price: $min_me_price
        min_me_price_equality: $min_me_price_equality
        max_me_price: $max_me_price
        max_me_price_equality: $max_me_price_equality
        is_exist: $is_exist
        is_active: $is_active
        from_sub_childs: $from_sub_childs
        coupon_id: $coupon_id
        from_all_shops: $from_all_shops
        page: $page
        limit: $limit
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
        withs: $withs
      ) {
        products {
          total
          per_page
          current_page
          from
          to
          last_page
          has_more_pages
          data {
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
              packaged_items {
                id
                me_price
                description
                details
                product_shop {
                  id
                  co_price
                  me_price
                  product_info {
                    id
                    title
                    barcode
                    introtext
                    images
                    brand {
                      title
                    }
                    category {
                      title
                    }
                    unit {
                      id
                      title
                    }
                  }
                }
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
    }
  `,
  listFullOption: gql`
    query listFullOption(
      $shop_ids: [String]
      $title: String
      $ids: [String]
      $category_ids: [String]
      $product_ids: [String]
      $discount_type_ids: [String]
      $brand_ids: [String]
      $brand_titles: [String]
      $barcodes: [String]
      $min_me_price: String
      $min_me_price_equality: String
      $max_me_price: String
      $max_me_price_equality: String
      $is_exist: Int
      $is_active: Int
      $from_sub_childs: Int
      $coupon_id: String
      $from_all_shops: Int
      $page: Int
      $limit: Int
      $orderBy_field: String
      $orderBy_direction: String
      $withs: [String]
    ) {
      productShop(
        shop_ids: $shop_ids
        title: $title
        ids: $ids
        category_ids: $category_ids
        product_ids: $product_ids
        discount_type_ids: $discount_type_ids
        brand_ids: $brand_ids
        brand_titles: $brand_titles
        barcodes: $barcodes
        min_me_price: $min_me_price
        min_me_price_equality: $min_me_price_equality
        max_me_price: $max_me_price
        max_me_price_equality: $max_me_price_equality
        is_exist: $is_exist
        from_sub_childs: $from_sub_childs
        coupon_id: $coupon_id
        from_all_shops: $from_all_shops
        page: $page
        limit: $limit
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
        withs: $withs
      ) {
        shops {
          id
          title
        }
        products {
          total
          per_page
          current_page
          from
          to
          last_page
          has_more_pages
          data {
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
            coupons {
              title
              type
              end_date
              end_date_shamsi
            }
          }
        }
        price_range {
          max_price
          min_price
        }
        brands {
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
          }
        }
      }
    }
  `,
  get: gql`
    query productShop($ids: [String], $barcodes: [String], $product_ids: [String], $shop_ids: [String], $limit: Int, $category_ids: [String], $orderBy_field: String) {
      productShop(ids: $ids, barcodes: $barcodes, product_ids: $product_ids, shop_ids: $shop_ids, category_ids: $category_ids, limit: $limit, orderBy_field: $orderBy_field) {
        products {
          data {
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
                id
                title
              }
              brand {
                id
                title
              }
              packaged_items {
                id
                me_price
                description
                details
                product_shop {
                  id
                  co_price
                  me_price
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
                  product_info {
                    id
                    title
                    barcode
                    introtext
                    images
                    brand {
                      id
                      title
                    }
                    category {
                      id
                      title
                    }
                    unit {
                      id
                      title
                    }
                  }
                }
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
    }
  `,
  productCollectedCategory : gql`
  query productCollectedCategory (
    $ids: [String]
    $shop_id: String!
    $is_active: Int
    $title: String
    $code: String
    $page: Int
    $limit: Int
    $orderBy_field: String
    $orderBy_direction: String
  ) {
    productCollectedCategory (
      ids: $ids
      shop_id: $shop_id
      is_active: $is_active
      title: $title
      code: $code
      page: $page
      limit: $limit
      orderBy_field: $orderBy_field
      orderBy_direction: $orderBy_direction
    ) {
        data {
          id
          title
          code
          is_active
          details
          items {
            id
            me_price
            is_active
            details
            product_shop {
              id
              co_price
              me_price
              product_info {
                id
                title
                images
                brand {
                  title
                }
                barcode
                introtext
                category {
                  title
                }
                unit {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  `
};
