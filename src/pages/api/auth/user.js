import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { user, cart } from "apollo/requests";

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
      method,
      session: { user: userSession },
    } = req;

    let userData = {
      orders: null,
      wallet: null,
      discounts: null,
      addresses: null,
      order_carts: null,
      category_coupons: null,
    }
    switch (method) {
      case 'GET':
        try {
          if (userSession) {
            const { data: { user: userData } } = await client.query({
              query: user.get,
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).send(JSON.stringify(userData));
          }
          const {data: {orderCart}} = await client.query({
            query: cart.orderCart,
          });
          return res.status(200).send(JSON.stringify({...userData, order_carts: orderCart}));
        } catch (error) {
          return res.status(400).json(error);
        }
      case 'PATCH':
        try {
          if (userSession) {
            const { data: { updateUserSelf: { user: userData } } } = await client.mutate({
              mutation: user.update,
              variables: body,
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).send(JSON.stringify(userData));
          }
          return res.status(200).json([]);
        } catch (error) {
          return res.status(400).json(error);
        }
    
      default:
        res.setHeader('Allow', ['GET', 'PATCH'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);
