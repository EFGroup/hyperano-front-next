import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { shop } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { shop: ids } = req.query;
    try {
      const { data: { shop: { data } } } = await client.query({
        query: shop.list,
        variables: {
          ids
        }
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);
