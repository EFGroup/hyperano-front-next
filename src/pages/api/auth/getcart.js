import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { cart } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getCart(req, res) {
    try {
      let userSession = req.session.user;
      if (!userSession?.token) {
        const {data: {orderCart}} = await client.query({
          query: cart.orderCart ,
        });
        return res.status(200).json(orderCart);
      }
      const {data: {orderCart}} = await client.query({
        query: cart.userOrderCart ,
        context: {
          headers: {
            authorization: `Bearer ${userSession?.token}`
          }
        }
      });
      return res.status(200).json(orderCart);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);

// export default async function getCart(req, res) {
//   const defaultReturnObject = { authenticated: false, userInfo: null };
//   try {
//     const {data, error} = await client.query({
//       query: cart.userOrderCart ,
//       context: {
//         serviceName: "auth",
//         headers: {
//           authorization: req?.headers?.authorization || null
//         }
//       }
//     });

//     if (error) {
//       res.status(400).json(defaultReturnObject);
//       return;
//     }

//     console.log("cart", data.orderCart)

//     res.status(200).json({ cart: data.orderCart });
//   }

//   catch (err) {
//     console.log('getCart, Something Went Wrong', err);
//     res.status(400).json(defaultReturnObject);
//   }
// }
