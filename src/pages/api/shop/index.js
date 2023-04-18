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
    const {
      body,
      method,
    } = req;
    switch (method) {
      case 'GET':
        try {
          const { data: { shop: { data: shops } } } = await client.query({
            query: shop.list,
            variables: body
          });
          return res.status(200).send(JSON.stringify(shops));
        } catch (error) {
          return res.status(400).json(error);
        }

      case 'POST':
        try {
          const { data: { shop: { data: shops } } } = await client.query({
            query: shop.list,
            variables: body
          });
          return res.status(200).send(JSON.stringify(shops));
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
