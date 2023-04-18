import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { order } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { method, body, session } = req;
    const userSession = session.user;
    const { order_id, address_id, shipping_id, payment_type_id, demand_date, demand_hour } = body;
    
    switch (method) {
      case 'POST':
        try {
          if (userSession) {
            const { data: { saveOrderInfo: { messages, model } } } = await client.mutate({
              mutation: order.saveInfo,
              variables: {
                order_id,
                address_id,
                shipping_id,
                payment_type_id,
                demand_date,
                demand_hour,
              },
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).json({messages, model});
          }
          return res.status(200).json([]);
        } catch (error) {
          return res.status(400).json(error);
        }
      default:
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);
