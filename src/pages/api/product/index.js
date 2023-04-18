import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productShop } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { shop } = req.query;
    try {
      const { data: { productShop: { products: { data: offslider } } } } = await client.query({
        query: productShop.get,
        variables: {
          shop_ids: shop,
          orderBy_field: "discount_percent",
          limit: 5
        }
      });
      return res.status(200).send(JSON.stringify(offslider));
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);