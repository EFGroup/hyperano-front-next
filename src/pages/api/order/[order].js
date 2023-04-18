import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { order } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const {
      body,
      method,
      query: { order: ids },
      session: { user: userSession },
    } = req;
    // const { order: ids } = query;
    // let userSession = session.user;
    switch (method) {
      case 'GET':
        try {
          if (userSession) {
            const { data: { order: { data } } } = await client.query({
              query: order.get,
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              },
              variables: {
                ids
              },
            });
            return res.status(200).send(JSON.stringify(data[0]));
          }
          return res.status(200).json([]);
        } catch (error) {
          return res.status(400).json(error);
        }
      case 'PATCH':
        try {
          if (userSession) {
            const { data: { updateOrder: { messages, model } } } = await client.mutate({
              mutation: order.update,
              variables: {
                ids,
                ...body
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
        res.setHeader('Allow', ['GET', 'PATCH'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);
