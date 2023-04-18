import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { shop } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

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