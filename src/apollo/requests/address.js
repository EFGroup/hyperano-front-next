import { gql } from '@apollo/client';

export default {
  list: gql`
    query list(
      $is_active: Int
      $ids: [String]
    ) {
      userAddress(
        is_active: $is_active
        ids: $ids
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
          lat
          lng
          pfu
          tellphone
          is_default
          postal_code
          main_street
          minor_address
        }
      }
    }
  `,
  get: gql`
    query get($ids: String) {
      userAddress(ids: $ids) {
        data {
          id
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
      }
    }
  `,
  create: gql`
    mutation create(
      $title: String!
      $main_street: String
      $minor_address: String
      $pfu: String
      $postal_code: String
      $lat: String
      $lng: String
      $tellphone: String
      $country_id: String
      $state_id: String
      $city_id: String
      $area_id: String
      $is_default: Int
      $is_active: Int
    ) {
      createUserAddress(
        title: $title
        main_street: $main_street
        minor_address: $minor_address
        pfu: $pfu
        postal_code: $postal_code
        lat: $lat
        lng: $lng
        tellphone: $tellphone
        country_id: $country_id
        state_id: $state_id
        city_id: $city_id
        area_id: $area_id
        is_default: $is_default
        is_active: $is_active
      ) {
        model {
          title
          main_street
          minor_address
          pfu
          postal_code
          lat
          lng
          tellphone
          is_active
          is_default
        }
        messages
      }
    }
  `,
  update: gql`
    mutation update(
      $ids: [String]!
      $title: String
      $main_street: String
      $minor_address: String
      $pfu: String
      $postal_code: String
      $lat: String
      $lng: String
      $tellphone: String
      $is_default: Int
      $is_active: Int
    ) {
      updateUserAddress(
        ids: $ids
        title: $title
        main_street: $main_street
        minor_address: $minor_address
        pfu: $pfu
        postal_code: $postal_code
        lat: $lat
        lng: $lng
        tellphone: $tellphone
        is_default: $is_default
        is_active: $is_active
      ) {
        model {
          title
          main_street
          minor_address
          pfu
          postal_code
          lat
          lng
          tellphone
          is_active
          is_default
        }
        influenced_count
        messages
      }
    }
  `,
  delete: gql`
    mutation delete($ids: [String]!) {
      deleteUserAddress(ids: $ids) {
        influenced_count
        messages
      }
    }
  `
};
