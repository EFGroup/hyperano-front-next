import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productCategory } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { shop } = req.query;
    try {
      const {data} = await client.query({
        query: productCategory.get,
        variables: {
          shop_id: shop || undefined
        }
      });
      // const menus = JSON.stringify(JSON.parse(data.productCategory));
      return res.status(200).json(data?.productCategory);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);