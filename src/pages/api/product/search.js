import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productShop } from "apollo/requests";

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const {
      body,
      query,
      method,
      session: { user: userSession },
    } = req;
    switch (method) {
      case 'GET':
        try {
          const { data: { productShop: { products: { data } } } } = await client.query({
            query: productShop.list,
            variables: {
              ...query,
              // shop_ids: userSession?.shop,
            }
          });
          return res.status(200).json((data));
        } catch (error) {
          console.log("err", error)
          return res.status(400).json(error);
        }
      case 'POST':
        try {
          const { data: { productShop: { products: { data } } } } = await client.query({
            query: productShop.list,
            variables: {
              ...body,
              // shop_ids: userSession?.shop,
            }
          });
          return res.status(200).send(JSON.stringify(data));
        } catch (error) {
          return res.status(400).json(error);
        }
    
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);