import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productShop } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { shop } = req.query;
    try {
      const { data: { productCollectedCategory : { data: collection } } } = await client.query({
        query: productShop.productCollectedCategory,
        variables: {
          shop_id: shop
        }
      });
      return res.status(200).send(JSON.stringify(collection));
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);