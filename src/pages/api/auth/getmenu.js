import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productCategory } from "apollo/requests";

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getMenu(req, res) {
    const { shop } = req.query;
    try {
      const {data: menus} = await client.query({
        query: productCategory.get ,
        variables: {
          shop_id: shop || undefined
        }
      });
      return res.status(200).json(JSON.parse(menus?.productCategory));
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);
