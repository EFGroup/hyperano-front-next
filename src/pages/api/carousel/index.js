import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { carousel } from "apollo/requests";

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

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
    const { shop, category } = req.query;
    try {
      const { data: { carousel: data } } = await client.query({
        query: carousel.get,
        variables: {
          shop_id: shop,
          category_ids: category,
          depth: 1,
          limit: 10
        }
      });
      return res.status(200).send(JSON.stringify(data));
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);