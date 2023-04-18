import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productShop } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { shop, product } = req.query;
    try {
      const { data: { productShop: { products: { data } } } } = await client.query({
        query: productShop.get,
        variables: {
          shop_ids: shop,
          product_ids: product
        }
      });
      return res.status(200).send(JSON.stringify(data[0]));
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);