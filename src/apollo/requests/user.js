import { gql } from '@apollo/client';

export default {
  registerUser: gql`
    mutation registerUser(
      $cellphone: String
      $password: String
      $first_shop_id: String
      $resend_register_code: Int
    ) {
      registerUser(
        cellphone: $cellphone
        password: $password
        first_shop_id: $first_shop_id
        resend_register_code: $resend_register_code
      ) {
        user {
          id
          token
          cellphone
          tellphone
          firstname
          lastname
          username
          email
          gender
          birth_date
          national_code
          created_at
        }
        messages
      }
    }
  `,
  activateUser: gql`
    mutation activateUser(
      $cellphone: String!
      $register_code: String!
      $password: String
      $shop_id: String
    ) {
      activateUser(
        cellphone: $cellphone
        register_code: $register_code
        password: $password
        shop_id: $shop_id
      ) {
        user {
          token
          cellphone
        }
        messages
      }
    }
  `,
  login: gql`
    mutation login($cellphone: String!, $password: String!) {
      login(cellphone: $cellphone, password: $password) {
        user {
          id
          token
          cellphone
          tellphone
          firstname
          lastname
          username
          email
          gender
          birth_date
          national_code
          created_at
          category_coupons {
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
          order_carts {
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
            category_coupon {
              id
            }
            discount_code
            items {
              id
              number
              co_price
              me_price
              previous_number
              previous_me_price
              messages
              user_agent
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
            min_order_cost
            min_order_cost_remaininig
            free_shipp_remaininig
            total_price_cart
            product_counts_cart
            product_numbers_cart
            discount_amount_cart
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
          wallet {
            balance
          }
        }
        messages
      }
    }
  `,
  forgetPassword: gql`
    mutation forgetPassword(
      $cellphone: String
      $resend_register_code: Int
      $register_code: String
      $password: String
    ) {
      forgetPassword(
        cellphone: $cellphone
        resend_register_code: $resend_register_code
        register_code: $register_code
        password: $password
      ) {
        messages
        opr_status
      }
    }
  `,
  updateUserSelf: gql`
    mutation updateUserSelf(
      $firstname: String
      $lastname: String
      $tellphone: String
      $national_code: String
      $address: String
      $birth_date: String
      $email: String
      $details: String
      $gender: Int
    ) {
      updateUserSelf(
        firstname: $firstname
        lastname: $lastname
        tellphone: $tellphone
        national_code: $national_code
        address: $address
        birth_date: $birth_date
        email: $email
        details: $details
        gender: $gender
      ) {
        user {
          id
          cellphone
          tellphone
          firstname
          lastname
          birth_date
          birth_date_shamsi
          national_code
          username
          email
          files
          details
          created_at
          created_at_shamsi
          gender
        }
        messages
      }
    }
  `,
  get: gql`
    query getUser {
      user {
        id
        token
        cellphone
        tellphone
        firstname
        lastname
        username
        email
        gender
        birth_date
        national_code
        created_at
        addresses {
          id
          title
          lat
          lng
          pfu
          tellphone
          is_default
          postal_code
          main_street
          minor_address
        }
        orders {
          id
        }
        category_coupons {
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
        order_carts {
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
          category_coupon {
            id
          }
          discount_code
          items {
            id
            number
            co_price
            me_price
            previous_number
            previous_me_price
            messages
            user_agent
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
          min_order_cost
          min_order_cost_remaininig
          free_shipp_remaininig
          total_price_cart
          product_counts_cart
          product_numbers_cart
          discount_amount_cart
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
        wallet {
          balance
        }
        discounts {
          code
          value
          expire_at
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
  `,
  getFullOptionUser: gql`
    query getFullOptionUser {
      user {
        id
        token
        cellphone
        tellphone
        firstname
        lastname
        address
        birth_date
        birth_date_shamsi
        national_code
        username
        email
        expires_in
        fee_ceiling
        fee_value
        webSite
        fax
        files
        details
        created_at
        created_at_shamsi
        updated_at
        device_token
        gender
        is_authorized
        is_active
        roles
        role_names
        wallet {
          balance
        }
        first_shop {
          title
        }
        status {
          title
        }
        type {
          title
        }
        addresses {
          id
          title
        }
        orders {
          id
        }
        category_coupons {
          id
          title
          is_active
          total_amount
          description
          start_date
          start_date_shamsi
          end_date
          end_date_shamsi
          coupons {
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
            coupon_user {
              used_amount
              usable
              remain_amount
            }
          }
        }
        discounts {
          code
          shop {
            title
          }
          expire_at
          expire_at_shamsi
          value
          discount_type {
            id
            title
          }
        }
        order_carts {
          id
          user_agent
          shop {
            id
            title
          }
          items {
            id
            user_agent
            co_price
            me_price
            number
            product_shop {
              id
              product_info {
                id
                title
                barcode
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
            discount_type {
              id
              title
            }
            discount_title
            discount_amount
          }
        }
      }
    }
  `,
  getOrderCart: gql`
    query getFullOptionUser {
      user {
        id
        token
        cellphone
        firstname
        lastname
        category_coupons {
          id
          title
          is_active
          total_amount
          description
          start_date
          start_date_shamsi
          end_date
          end_date_shamsi
          coupons {
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
            coupon_user {
              used_amount
              usable
              remain_amount
            }
          }
        }

        order_carts {
          id
          user_agent
          shop {
            id
            title
          }
          items {
            id
            user_agent
            co_price
            me_price
            number
            product_shop {
              id
              product_info {
                id
                title
                barcode
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
          }
        }
      }
    }
  `,
};