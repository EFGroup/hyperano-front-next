import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { order } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { method, body, session } = req;
    const userSession = session.user;
    
    switch (method) {
      case 'POST':
        try {
          if (userSession) {
            const { data: { confirmOrder: { messages, model, online_payment_refId } } } = await client.mutate({
              mutation: order.confirm,
              variables: body,
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).json({messages, model, online_payment_refId});
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
