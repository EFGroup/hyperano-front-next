import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { cart } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    try {
      let userSession = req.session.user;
      if (userSession) {
        const {data: {orderCart}} = await client.query({
          query: cart.userOrderCart,
          context: {
            headers: {
              authorization: `Bearer ${userSession?.token}`
            }
          }
        });
        return res.status(200).send(JSON.stringify(orderCart));
      }
      const {data: {orderCart}} = await client.query({
        query: cart.orderCart,
      });
      return res.status(200).json(orderCart);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);