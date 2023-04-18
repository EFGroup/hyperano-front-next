import { gql } from '@apollo/client';

export default {
  list: gql`
    query list($shop_id: String) {
      score(shop_id: $shop_id) {
        id
        title
      }
    }
  `,
  scoringOrder: gql`
    mutation scoringOrder($order_id: String!, $scores: [String]!) {
      scoringOrder(
        order_id: $order_id
        scores: [{ $score_id: String!, $score_value: Int, $description: String! }]
      ) {
        model {
          scores {
            id
            title
          }
        }
        messages
      }
    }
  `
};
