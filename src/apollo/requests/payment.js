import { gql } from '@apollo/client';

export default {
  list: gql`
    query paymentType($shop_id: String) {
      paymentType(shop_id: $shop_id) {
        id
        title
        is_default
        details
      }
    }
  `,
  onlinePayment: gql`
    mutation onlinePayment($order_id: String!) {
      onlinePayment(order_id: $order_id) {
        model {
          customer {
            firstname
            lastname
            cellphone
          }
          id
          tracking_code
          created_at
          created_at_shamsi
          wallet_settled_amount
          total_cost
          paid_cost
          description
          sys_description
          payment_type {
            id
            title
          }
          status {
            id
            title
          }
          payment_status {
            id
            title
          }
          call_me
          shop {
            id
            title
            support_info
          }
        }
        online_payment_refId
        messages
      }
    }
  `
};
