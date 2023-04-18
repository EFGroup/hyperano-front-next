import { gql } from '@apollo/client';

export default {
  get: gql`
    query productCategory(
      $ids: [String]
      $category_id: String
      $shop_type_id: String
      $title: String
      $shop_id: String
      $walk_direction: String
      $depth: Int
      $selected_categories: Int
      $orderBy_field: String
      $orderBy_direction: String
    ) {
      productCategory (
        ids: $ids
        category_id: $category_id
        shop_type_id: $shop_type_id
        title: $title
        shop_id: $shop_id
        walk_direction: $walk_direction
        depth: $depth
        selected_categories: $selected_categories
        orderBy_field: $orderBy_field
        orderBy_direction: $orderBy_direction
      ) {
        id
        icon
        title
        images
        banners
        parent_id
        children {
          id
          icon
          title
          images
          banners
          parent_id
          children {
            id
            icon
            title
            images
            banners
            parent_id
            children {
              id
              icon
              title
              images
              banners
              parent_id
            }
          }
        }
      }
    }
  `,
};
