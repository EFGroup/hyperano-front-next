import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { order } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    let userSession = req.session.user;
    try {
      if (userSession) {
        const { data: { order: { data } } } = await client.query({
          query: order.list,
          context: {
            serviceName: "auth",
              headers: {
                authorization: `Bearer ${userSession?.token}`
            }
          }
        });
        return res.status(200).send(JSON.stringify(data));
      }
      return res.status(200).json([]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);
